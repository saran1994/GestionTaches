$(document).ready(function() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function displayTasks() {
        $('#tasks-body').empty();
        tasks.forEach(function(task, index) {
            $('#tasks-body').append('<tr>' +
                '<td>' + task.task + '</td>' +
                '<td>' + task.dueDate + '</td>' +
                '<td>' + task.priority + '</td>' +
                '<td>' + task.status + '</td>' +
                '<td><button class="delete" data-index="' + index + '">Supprimer</button></td>' +
                '</tr>');
        });
    }

    displayTasks();

    $('#todo-form').submit(function(event) {
        event.preventDefault();
        let task = $('#task').val();
        let dueDate = $('#due-date').val();
        let priority = $('#priority').val();
        let status = $('#status').val();
        tasks.push({ task: task, dueDate: dueDate, priority: priority, status: status });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
        this.reset();
    });

    $(document).on('click', '.delete', function() {
        let index = $(this).data('index');
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    });
});