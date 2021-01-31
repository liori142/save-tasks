let arrayDays = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת']


$(document).ready(function(){
    // AddTask Event
    $("#add-task-form").on("submit",function(e){
        addTask(e);
    });

    // Edit Event
    $('#edit-task-form').on('submit',function(e){
        updateTask(e);
    });

    // Remove task Event
    $('#taskTableID').on('click','#remove-task', function(){
        id = $(this).data('id');
        removeTask(id);
    });

    // Clear all tasks Event
    $('#clearTasksID').on('click',function(){
        clearAllTasks();
    });


    displayTasks();

    // Function to display tasks
    function displayTasks(){
        var taskList = JSON.parse(localStorage.getItem("tasks"));

        if(taskList != null){
            taskList = taskList.sort(sortByDate);
            taskList = taskList.sort(sortByTime);
        }

        // Check Tasks
        if(localStorage.getItem("tasks") != null){

        // Loop through and display
            $.each(taskList,function(key, value){
            let dateArr = value.task_date.split('-')
                $("#taskTableID").append(
                    "<tr id = '"+ value.id+"'>" + 
                    "<td>" + value.task + "</td>"+
                    "<td>" + value.task_priority + "</td>" +
                    "<td style = 'white-space: nowrap'>" + `${dateArr[2]}-${dateArr[1]}` + "</td>"+
                    "<td>" + arrayDays[new Date(value.task_date).getDay()] + "</td>"+
                    "<td>" + value.task_time  + "</td>"+
                    "<td>" + value.report + "</td>"+
                    "<td style = 'white-space: nowrap'> <a class = 'btn btn-dark ' href ='edit.html?id="+ value.id+ "'>Edit</a>  <a href='#' class='btn btn-danger' id = 'remove-task' data-id='" +value.id +"'>Remove</a></td>" +
                    "</tr>");
            })
        }}

    // Function to sort tasks
    function sortByTime(a,b){
        if(a.task_date != b.task_date){
            return;
        }else{

        let aTime = a.task_time;
        let bTime = b.task_time;
        return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0 ));
        }
    }

    function sortByDate(a,b){
        let aDate = a.task_date;
        let bDate = b.task_date;
        return ((aDate < bDate) ? -1 : ((aDate > bDate) ? 1 : 0 ));
    }
    // Function to add task
    function addTask(e){
        // Add Unique ID
        let newDate =new Date();
        id = newDate.getTime();

        let task = $("#task").val();
        let task_priority = $("#priority").val();
        let task_date = $("#date").val();
        let task_time = $("#time").val();
        let report = $("#report").val();

        // Validation
        if(task == ''){
            alert("Task is required");
            e.preventDefault();
        }else if(task_date ==''){
            alert("Date is required");
            e.preventDefault();
        }else if (task_time == ''){
            alert("Time is required");
            e.preventDefault();
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));

            // Check Tasks

            if(tasks == null){
                tasks = [];
            }

            // New Task Object
            var new_task = {
                "id" : id,
                "task" : task,
                "task_priority" : task_priority,
                "task_date" : task_date,
                "task_time" : task_time,
                "report" : report,
            }

            tasks.push(new_task);
            localStorage.setItem('tasks',JSON.stringify(tasks));
            
            console.log("Task added");
        }
    }

    // Function to update tasks
    function updateTask(e){
        var id = $('#task_id').val();
        var task = $("#task").val();
        var task_priority = $("#priority").val();
        var task_date = $("#date").val();
        var task_time = $("#time").val();
        var report = $("#report").val();
      

        taskList = JSON.parse(localStorage.getItem('tasks'));

        for (let index = 0; index < taskList.length; index++) {
            if(taskList[index].id == id){
                taskList.splice(index,1);
            }
            localStorage.setItem('tasks',JSON.stringify(taskList));
        }

        // Validation
        if(task == ''){
            alert("Task is required");
            e.preventDefault();
        }else if(task_date ==''){
            alert("Date is required");
            e.preventDefault();
        }else if (task_time == ''){
            alert("Time is required");
            e.preventDefault();
        }else{
tasks = JSON.parse(localStorage.getItem('tasks'));

            // Check Tasks
            if(tasks == null){
                tasks = [];
            }

            var taskList = JSON.parse(localStorage.getItem('tasks'));

            // New Task Object
            var new_task = {
                "id" : id,
                "task" : task,
                "task_priority" : task_priority,
                "task_date" : task_date,
                "task_time" : task_time,
                "report" : report
            }

            tasks.push(new_task);
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
    }

    // Function to remove task
        function removeTask(id){
            if(confirm('Are you sure you want to delete this task?')){
                var taskList = JSON.parse(localStorage.getItem('tasks'));

                for (let index = 0; index < taskList.length; index++) {
                    if(taskList[index].id == id){
                        taskList.splice(index,1);
                    }
                    localStorage.setItem('tasks',JSON.stringify(taskList));
                }

                location.reload();
            }
        }

        // Function to clear all tasks
        function clearAllTasks(){
            if(confirm('Do you want to clear all tasks?')){
                localStorage.clear();
                location.reload();
            }
        }
});



// Function for getting single task
function getTask(){
    var $_GET = getQueryParams(document.location.search);
    id = $_GET['id'];

    var taskList = JSON.parse(localStorage.getItem('tasks'));

    for(var i = 0 ; i < taskList.length; i++){
        if(taskList[i].id == id){
            $('#edit-task-form #task_id').val(taskList[i].id);
            $('#edit-task-form #task').val(taskList[i].task);
            $('#edit-task-form #priority').val(taskList[i].task_priority);
            $('#edit-task-form #date').val(taskList[i].task_date);
            $('#edit-task-form #time').val(taskList[i].task_time);
        }
    }
}

// Function to get HTTP GET request
function getQueryParams(qs){
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
        while(tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
        }

        return params;
}
