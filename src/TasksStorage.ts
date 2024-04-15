type Task = {
    id: number; 
    title: string;
    isDone: boolean;
}
class TasksStorage {
    protected lsKey = 'C@#@#C#C$@#C@#C$@#C@#';

    getItems() {
        let value = localStorage.getItem(this.lsKey);
        let items = []
        if (value === null) {
            localStorage.setItem(this.lsKey, JSON.stringify([]));
        } else {
            items = JSON.parse(value);
        }
        return items;
    }

    setItems(items:Task[]) {
        localStorage.setItem(this.lsKey, JSON.stringify(items));
    }
}

export default TasksStorage