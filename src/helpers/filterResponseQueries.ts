class ResponseQueries {
  private genObj (value: any): any {
    return {
      value,
      text: value
    };
  }

  private removeDuplicates (fields: any[]): any[] {
    return [...new Set(fields)];
  }

  public organizeDbFields (item:any[], field:string):any[] {
    const values: any[] = [];
    item.forEach(element => {
      values.push(this.genObj(element[field]));
    });
    return this.removeDuplicates(values);
  }
}

export default new ResponseQueries();
