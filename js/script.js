$(document).ready(function() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Mise à jour du tableau
    function displayTasks() {
        // Recupérer l'élément avec l'id et vider son contenu 
        $('#tasks-body').empty();
        if (tasks.length === 0) {
            // Afficher un message si le tableau est vide
            $('#tasks-body').append('<tr><td colspan="5">Aucune tâche à afficher</td></tr>');
        } else {
            tasks.forEach(function(task, index) {
                // Sauvegarde des nouvelles données saisies dans le formulaire
                $('#tasks-body').append('<tr>' +
                    '<td>' + task.task + '</td>' +
                    '<td>' + task.dueDate + '</td>' +
                    '<td>' + task.priority + '</td>' +
                    '<td>' + task.status + '</td>' +
                    '<td><button class="delete" data-index="' + index + '">Supprimer</button></td>' +
                    '</tr>');
            });
        }
    }

    displayTasks();

    // Ajout
    $('#todo-form').submit(function(event) {
        
        if (this.checkValidity()) {
            let task = $('#task').val();
            let dueDate = $('#due-date').val();
            let priority = $('#priority').val();
            let status = $('#status').val();
            tasks.push({ task: task, dueDate: dueDate, priority: priority, status: status });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
            this.reset();
            showMessage('Tâche ajoutée avec succès');
        } else {
            showMessage('Veuillez remplir tous les champs obligatoires.');
        }
    });

    // Suppression
    $(document).on('click', '.delete', function() {
        let index = $(this).data('index');
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
        showMessage('Tâche supprimée avec succès');
    });

    // Affichage du message
    function showMessage(message) {
        let popup = document.getElementById('popup');
        let popupMessage = document.getElementById('popup-message');
        popupMessage.innerText = message;
        popup.style.display = 'block';
        setTimeout(function() {
            popup.style.display = 'none';
        }, 1500);
    }
});
