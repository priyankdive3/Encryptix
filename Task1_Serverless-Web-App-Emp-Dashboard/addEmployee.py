import json
import boto3

# Create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# Use the DynamoDB object to select our table
table = dynamodb.Table('employeeMaster')

# Define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):
    # Extract values from the event object we got from the Lambda service and store in variables
    employeeid = event['employeeid']
    Employee_Name = event['name']
    Designation = event['designation']
    Department = event['department']
    Employee_Code = event['code']
    Joining_Date = event['joiningdate']
    
    # Write employee data to the DynamoDB table and save the response in a variable
    response = table.put_item(
        Item={
            'employeeid': employeeid,
            'name': Employee_Name,
            'designation': Designation,
            'department': Department,
            'code': Employee_Code,
            'joiningdate': Joining_Date
        }
    )
    
    # Return a properly formatted JSON object
    return {
        'statusCode': 200,
        'body': json.dumps('Employee data saved successfully!')
    }
