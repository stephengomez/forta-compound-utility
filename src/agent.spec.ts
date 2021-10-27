import {
  FindingType,
  FindingSeverity,
  Finding,
  HandleTransaction,
} from 'forta-agent'
import { keccak256 } from 'forta-agent/dist/sdk/utils';
import agent from './agent'
import { AGENT_DESCRIPTION, AGENT_NAME, ALERT_ID, C_AAVE, MINT_SIG } from './constant';
import { createTxEvent } from './utils';
import { UtilityMap, Utility } from './utility';
import { BigNumber } from '@ethersproject/bignumber';

describe('Compound governance agent', () => {
  let handleTransaction: HandleTransaction;

  const mockUtilityMap = new Utility(60, 10);

  const mockTotalBorrow = jest.fn();
  const mockTotalSupply = jest.fn();

  
  describe('handleTransaction', () => {
    beforeAll(() => {
      handleTransaction = agent.provideHandleTransaction(mockUtilityMap, mockTotalBorrow, mockTotalSupply);
    })

    it('returns empty findings if tx not call to cTokens', async () => {
      const txEvent = createTxEvent('not_a_c_token', [''], '');

      const findings = await handleTransaction(txEvent);

      expect(findings).toStrictEqual([]);
    });

    it('returns empty findings if tx call to cTokens but not combine event signature', async () => {
      const txEvent = createTxEvent(C_AAVE, ['not_a_signature'], '');

      const findings = await handleTransaction(txEvent);

      expect(findings).toStrictEqual([]);
    });

    it('returns a empty if utility rate not change', async () => {
      mockTotalBorrow.mockReset();
      mockTotalSupply.mockReset();
      mockTotalBorrow.mockReturnValue(BigNumber.from(10));
      mockTotalSupply.mockReturnValue(BigNumber.from(1000));
      const txEvent1 = createTxEvent(
        C_AAVE,
        [keccak256(MINT_SIG)],
        ''
      );

      const findings1 = await handleTransaction(txEvent1);

      mockTotalBorrow.mockReturnValue(BigNumber.from(10));
      mockTotalSupply.mockReturnValue(BigNumber.from(1000));

      const txEvent2 = createTxEvent(
        C_AAVE,
        [keccak256(MINT_SIG)],
        ''
      );
      const findings2 = await handleTransaction(txEvent2);

      expect(findings2).toStrictEqual([])
    });

    it('returns a finding if tx combine event and utility rate out of range', async () => {
      mockTotalBorrow.mockReset();
      mockTotalSupply.mockReset();
      mockTotalBorrow.mockReturnValue(BigNumber.from(10));
      mockTotalSupply.mockReturnValue(BigNumber.from(1000));
      const txEvent1 = createTxEvent(
        C_AAVE,
        [keccak256(MINT_SIG)],
        ''
      );

      const findings1 = await handleTransaction(txEvent1);

      mockTotalBorrow.mockReturnValue(BigNumber.from(1000));
      mockTotalSupply.mockReturnValue(BigNumber.from(1000));

      const txEvent2 = createTxEvent(
        C_AAVE,
        [keccak256(MINT_SIG)],
        ''
      );
      const findings2 = await handleTransaction(txEvent2);

      expect(findings2).toStrictEqual([
        Finding.fromObject({
          name: AGENT_NAME,
          description: AGENT_DESCRIPTION,
          alertId: ALERT_ID,
          severity: FindingSeverity.Medium,
          type: FindingType.Suspicious,
          metadata: {
            totalBorrows: '1000',
            totalSupply: '1000',
          }
        }),
      ])
    });
  })
})
