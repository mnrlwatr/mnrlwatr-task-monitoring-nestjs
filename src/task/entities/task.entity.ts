export class Task {
  id: number;
  title: string;
  description: string;
  priority: number;
  // Vazifaga tashkilot xodimni biriktirish
  employee_id: number;
  completed: boolean;
  // Vazifaga bajarish muddatini qo'shish
  deadline: Date | undefined;
  // Vazifa yaratilyotganda qaysi loyihaga tegishliligini ko'rsatish
  project_id: number;

  constructor(
    id: number,
    title: string,
    description: string,
    priority: number,
    employee_id: number,
    completed: boolean,
    deadline: Date | undefined,
    project_id: number,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.employee_id = employee_id;
    this.completed = completed;
    this.deadline = deadline;
    this.project_id = project_id;
  }
}
