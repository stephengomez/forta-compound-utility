import { BigNumber } from '@ethersproject/bignumber';
import { 
  Finding, 
  HandleTransaction, 
  TransactionEvent, 
  FindingSeverity, 
  FindingType,
} from 'forta-agent';
import {
  AGENT_NAME,
  ALERT_ID,
  AGENT_DESCRIPTION,
  C_TOKENS,
  MINT_SIG,
  REDEEM_SIG,
  BORROW_SIG,
  REPAY_BORROW_SIG,
} from './constant';
import { Utility } from './utility';
import { totalBorrowsCurrent, totalSupplyCurrent } from './utils';

/**
 * new map with 60 minutes range and 10% ratio
 */
const utilityMap = new Utility(60, 10);

const provideHandleTransaction = (
  utilityMap: Utility,
  totalBorrowsCurrent: (cTokenAddress: string) => Promise<BigNumber | undefined>,
  totalSupplyCurrent: (cTokenAddress: string) => Promise<BigNumber | undefined>,
) : HandleTransaction => {
  return async function handleTransaction(txEvent: TransactionEvent) {

    const findings: Finding[] = [];
    
    if (!C_TOKENS.includes(txEvent.to) || !txEvent.to) return findings;
    
    const events = 
      txEvent
      .filterEvent(MINT_SIG, txEvent.to)
      .concat(txEvent.filterEvent(REDEEM_SIG, txEvent.to))
      .concat(txEvent.filterEvent(BORROW_SIG, txEvent.to))
      .concat(txEvent.filterEvent(REPAY_BORROW_SIG, txEvent.to));
    
    if (!events.length) return findings;
    
    const [
      totalBorrows,
      totalSupply,
    ]= await Promise.all([
      totalBorrowsCurrent(txEvent.to),
      totalSupplyCurrent(txEvent.to),
    ]);
    
    if (!totalBorrows || !totalSupply) return findings;
    
    /**
     * we have to muliply 10000 of utility rate cause Bignumber will return 0
     */
    const utilityRate = totalBorrows.mul(10000).div(totalBorrows.add(totalSupply));

    if (utilityMap.check(txEvent.to, utilityRate.toNumber())) {
      findings.push(Finding.fromObject({
        name: AGENT_NAME,
        description: AGENT_DESCRIPTION,
        alertId: ALERT_ID,
        severity: FindingSeverity.Medium,
        type: FindingType.Suspicious,
        metadata: {
          totalBorrows: totalBorrows.toString(),
          totalSupply: totalSupply.toString(),
        }
      }));
    }

    utilityMap.add(txEvent.to, txEvent.timestamp, utilityRate.toNumber());

    return findings;
  }
}

export default {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(utilityMap, totalBorrowsCurrent, totalSupplyCurrent),
}