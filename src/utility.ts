export type UtilityMap = {
  [cToken: string]: {
    timeStamp: number,
    utilityRate: number,
  }[],
}

export class Utility {
  /**
   * we store utility of each c_token in this map
   */
  utilityMap: UtilityMap;

  /**
   * time range that store data in map
   */
  timeRangeSeconds: number;

  /**
   * 
   */
  alertRange: number;

  /**
   * 
   * @param timeRangeMinutes time range in minutes
   * @param alertRange ratio of utility rate change that will alert
   */
  constructor(timeRangeMinutes: number, alertRange_: number) {
    this.timeRangeSeconds = timeRangeMinutes * 60;
    this.utilityMap = {};
    this.alertRange = alertRange_;
  }

  add(cToken: string, timeStamp: number, utilityRate: number) {
    if(!this.utilityMap[cToken]) {
      this.utilityMap[cToken] = [];
    }

    this.utilityMap[cToken].push({ timeStamp, utilityRate });

    this.utilityMap[cToken] = this.utilityMap[cToken].filter(
      t => t.timeStamp > timeStamp - this.timeRangeSeconds
    );
  }

  check(cToken: string, utilityRate: number) {
    if(!this.utilityMap[cToken]) {
      this.utilityMap[cToken] = [];
    }
    
    const minUtilityRate = Math.min(...this.utilityMap[cToken].map(t => t.utilityRate)) || 0;
    const maxUtilityRate = Math.max(...this.utilityMap[cToken].map(t => t.utilityRate)) || 0;

    return utilityRate > maxUtilityRate + maxUtilityRate * this.alertRange / 100 ||
      utilityRate < minUtilityRate - minUtilityRate * this.alertRange / 100 ;
  }
}