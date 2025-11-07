export class Project {
  id: number;
  name: string;
  organization_id: number;

  constructor(id: number, name: string, organization_id: number) {
    this.id = id;
    this.name = name;
    this.organization_id = organization_id;
  }
}
