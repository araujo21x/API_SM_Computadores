import { getRepository } from 'typeorm';

import GridMother from '../../database/entity/gridMother.entity';
import PieceGrid from '../../database/entity/pieceGrid.entity';

class GridMotherHelper {
  public async getGrids (id: number): Promise<any> {
    const grids = await getRepository(GridMother).createQueryBuilder('grid')
      .leftJoinAndSelect('grid.pieceGrid', 'pieceGrid')
      .where('grid.mother =:id', { id })
      .getMany();
    return grids.length === 0 ? undefined : this.gridResponse(grids);
  }

  private gridResponse (grids: Array<GridMother>): any {
    const motherModeGrids: Array<GridMother> = grids.filter(
      (element: GridMother) => element.mode === 'motherboard'
    );
    const pcModeGrids: Array<GridMother> = grids.filter(
      (element: GridMother) => element.mode === 'pc'
    );

    return {
      motherBoard: this.createModes(motherModeGrids[0].pieceGrid),
      pc: this.createModes(pcModeGrids[0].pieceGrid)
    };
  }

  private createModes (pieceGrid: Array<PieceGrid>): any {
    const answer: any = { ram: [], ramDocked: [] };

    pieceGrid.forEach((element: PieceGrid) => {
      switch (element.type) {
        case 'cpu':
          answer.cpu = { gridColumn: element.gridColumn, gridRow: element.gridRow };
          break;
        case 'cooler':
          answer.cooler = { gridColumn: element.gridColumn, gridRow: element.gridRow };
          break;
        case 'ram':
          answer.ram.push(
            { div: element.div, gridColumn: element.gridColumn, gridRow: element.gridRow }
          );
          break;
        case 'ramDocked':
          answer.ramDocked.push(
            { div: element.div, gridColumn: element.gridColumn, gridRow: element.gridRow }
          );
          break;
        case 'm2':
          answer.m2 = { gridColumn: element.gridColumn, gridRow: element.gridRow };
          break;
        case 'pciExpress1':
          answer.pciExpress1 = { gridColumn: element.gridColumn, gridRow: element.gridRow };
          break;
        case 'pciExpress1Docked':
          answer.pciExpress1Docked = { gridColumn: element.gridColumn, gridRow: element.gridRow };
          break;
      }
    });

    return answer;
  }
}

export default new GridMotherHelper();
