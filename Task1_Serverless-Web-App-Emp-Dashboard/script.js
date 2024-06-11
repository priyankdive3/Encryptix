$(document).ready(function () {
    // Show add employee form when the button is clicked
    $('#addEmployee').click(function () {
        $('.add-employee-form').toggle();
    });

    // AJAX POST request to add an employee
    $('.add-employee-form form').submit(function (event) {
        event.preventDefault();
        var inputData = {
            "employeeid": $('#employeeid').val(),
            "name": $('#name').val(),
            "designation": $('#designation').val(),
            "department": $('#department').val(),
            "code": $('#code').val(),
            "joiningdate": $('#joiningdate').val()
        };
        $.ajax({
            url: "https://dj7d9qygyd.execute-api.ap-south-1.amazonaws.com/EmployeeStage",
            type: 'POST',
            data: JSON.stringify(inputData),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                console.log("Employee Data Saved!");
                // Hide the form after successful submission
                $('.add-employee-form').hide();
                // Clear form fields
                $('.add-employee-form form')[0].reset();
            },
            error: function () {
                alert("Error adding employee data.");
            }
        });
    });

    // AJAX GET request to retrieve all employees
    $('#getAllEmployees').click(function () {
        $.ajax({
            url: "https://dj7d9qygyd.execute-api.ap-south-1.amazonaws.com/EmployeeStage",
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                $('#employeeTable tbody').empty(); // Clear existing rows
                $.each(response, function (i, data) {
                    $("#employeeTable tbody").append("<tr> \
                        <td>" + data['employeeid'] + "</td> \
                        <td>" + data['name'] + "</td> \
                        <td>" + data['designation'] + "</td> \
                        <td>" + data['department'] + "</td> \
                        <td>" + data['code'] + "</td> \
                        <td>" + data['joiningdate'] + "</td> \
                        </tr>");
                });
            },
            error: function (xhr, status, error) {
                console.error("Error retrieving employee data:", status, error);
                alert("Error retrieving employee data. See console for details.");
            }
        });
    });

    // AJAX GET request to retrieve all employees
    $('#getAlldept').click(function () {
        $.ajax({
            url: "https://dj7d9qygyd.execute-api.ap-south-1.amazonaws.com/EmployeeStage",
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                $('#employeeTable tbody').empty(); // Clear existing rows
                $.each(response, function (i, data) {
                    $("#employeeTable tbody").append("<tr> \
                        <td>" + data['department'] + "</td> \
                        </tr>");
                });
            },
            error: function (xhr, status, error) {
                console.error("Error retrieving employee data:", status, error);
                alert("Error retrieving employee data. See console for details.");
            }
        });
    });
});
