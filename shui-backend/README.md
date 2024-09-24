# Shui API

### Create message

- POST https://your-aws-link-here/message

```
body:
{ 
 "username": "JohnDoe", 
 "text": "Mitt första inlägg"
}
```

```
response:
{
	"data": {
		"id": "2U5UuIXOrLV9P7tWaKxPG",
		"username": "JohnDoe",
		"text": "Mitt första inlägg",
		"createdAt": "2024-09-24 13:34:05"
	}
}
```

### Get all messages

- GET https://your-aws-link-here/messages

```
response:
{
	"data": [
		{
			"createdAt": "2024-09-24 13:34:05"
			"text": "Mitt första inlägg",
			"username": "JohnDoe",
			"id": "2U5UuIXOrLV9P7tWaKxPG"
		},
		{
			"createdAt": "2024-09-24 08:53:48",
			"text": "Ett inlägg om något som är trevligt",
			"username": "ErnstSvensson",
			"id": "YYX99sUscIHlKvIt8uK6j"
		}
	]
}
```

### Get message with username

- GET https://your-aws-link-here/messages/{username}

```
response:
{
	"data": [
		{
			"createdAt": "2024-09-24 13:34:05"
			"text": "Mitt första inlägg",
			"username": "JohnDoe",
			"id": "2U5UuIXOrLV9P7tWaKxPG"
		}
	]
}
```

### Get message with ID

- GET https://your-aws-link-here/messages/{id}

```
response:
{
	"data": [
		{
			"createdAt": "2024-09-24 13:34:05"
			"text": "Mitt första inlägg",
			"username": "JohnDoe",
			"id": "2U5UuIXOrLV9P7tWaKxPG"
		}
	]
}
```

### Update message

- PUT https://your-aws-link-here/message/{id}

```
body:
{ 
	"text": "Mitt första inlägg - uppdaterat" 
}
```

```
response:
{
	"data": {
		"text": "Mitt första inlägg - uppdaterat"
	}
}
```

### Delete message

- DELETE https://your-aws-link-here/message/{id}

```
response:
{
	"data": {
		"message": "Meddelandet är borttaget"
	}
}
```
