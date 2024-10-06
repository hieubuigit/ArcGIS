import { GisMap } from '../gis-map/gis-map.model';
import { Paging } from '../share/common';

export namespace MaintainTransaction {
  export interface Request extends Paging {}

  export interface Response {
    maintainCode: string;
    maintainName: string;
    description: string;
    cost: number;
    latestUpdate: string;
    createdDate: string;
    createdBy: string;
    updatedDate: string;
    updatedBy: string;
    status: GisMap.Status;
  }

  export interface MaintainPaging {
    total: number;
    totalPage: number;
    maintenances: Response[];
  }

}
