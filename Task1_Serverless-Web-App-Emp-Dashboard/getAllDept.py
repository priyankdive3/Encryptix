import json
import boto3

def lambda_handler(event, context):
    # Initialize a DynamoDB resource object for the specified region
    dynamodb = boto3.resource('dynamodb', region_name='ap-south-1')

    # Select the DynamoDB table named 'employeeMaster'
    table = dynamodb.Table('employeeMaster')

    # Scan the table to retrieve all items
    response = table.scan()
    items = response['Items']

    # If there are more items to scan, continue scanning until all items are retrieved
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        items.extend(response['Items'])

    # Extract unique department names from the scanned items
    departments = set(item['department'] for item in items)

    # Convert the set of departments into a list
    department_list = list(departments)

    # Return the list of departments
    return department_list
