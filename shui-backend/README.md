# Shui API

### Create message

- POST https://your-aws-link-here/message

Kräver username och text i body. Användarnamn får inte innehålla något mellanrum

 <i> Body </i>
```
{ 
 "username": "JohnDoe", 
 "text": "Mitt första inlägg"
}
```
 <i> Response </i>
```
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

 <i> Response </i>
```
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

Kräver att användarnamn finns och skickas som pathParam.
Meddelanden filtreras för att hämta de som matchar användarnamnet. Delmatchningar av användarnamnet är tillåtna, så du behöver inte skriva in hela namnet för att få ett resultat.

 <i> Response </i>
```
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

Kräver att id finns och skickas som pathParam 

 <i> Response </i>
```
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

Kräver att id finns och skickas som pathParam samt att text skickas med i bodyn

 <i> Body </i>
```
{ 
	"text": "Mitt första inlägg - uppdaterat" 
}
```

 <i> Response </i>
```
{
	"data": {
		"text": "Mitt första inlägg - uppdaterat"
	}
}
```

### Delete message

- DELETE https://your-aws-link-here/message/{id}

Kräver att id finns och skickas som pathParam

 <i> Response </i>
```
{
	"data": {
		"message": "Meddelandet är borttaget"
	}
}
```
