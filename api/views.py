from django.views.decorators.csrf import csrf_exempt
from json import loads
from api.utils import collection
from django.http.response import JsonResponse
from bson.objectid import ObjectId

@csrf_exempt
def listApi(request):
  if request.method == 'GET':
    lists = collection.find({})
    convertedLists = objectIdConverter(list(lists))
    return JsonResponse(convertedLists,safe=False)
  
  if request.method == 'POST':
    data = request.body
    parsedData = loads(data)
    collection.insert_one(parsedData)
    lists = collection.find({})
    convertedLists = objectIdConverter(list(lists))
    return JsonResponse(convertedLists,safe=False)

  if request.method == 'PUT':
    data = request.body
    parsedData = loads(data)
    listToUpdate = parsedData['_id']
    collection.find_one_and_update({
      '_id':ObjectId(f'{listToUpdate}')},
      {
        '$set': {
          'name': parsedData['name'],
          'dueDate': parsedData['dueDate'],
          'image': parsedData['image'],
          'comment': parsedData['comment'],
          'priority': parsedData['priority'],
          'tasks': parsedData['tasks'],
        }
      }, upsert = True)
    lists = collection.find({})
    convertedLists = objectIdConverter(list(lists))
    return JsonResponse(convertedLists,safe=False)
  
  if request.method == 'DELETE':
    data = request.body
    parsedData = loads(data)
    collection.find_one_and_delete({'_id':ObjectId(f'{parsedData}')})
    lists = collection.find({})
    convertedLists = objectIdConverter(list(lists))
    return JsonResponse(convertedLists,safe=False)
  
def objectIdConverter(lists):
  for item in lists :
    item['_id'] = str(item['_id'])
  return lists
