# MIDDLEWARE - express

Um ***Middleware*** é a principal funcionalidade da biblioteca ***express.***  É um interceptador de requisições, utilizado normalmente quando queremos que algum trecho de código seja disparado de forma automática em uma ou mais rotas requeridas de uma aplicação. Um middleware possui acesso aos objetos de requisição (*request*), resposta (*response*) e uma função chamada *next.*

O Middleware é capaz de:

1. Interromper totalmente uma requisição;
2. Alterar dados de uma requisição;
3. Executar techos de código de forma automática.

---

Como definir um middleware para todas as rotas de uma aplicação:

```jsx
// recebe todos os parâmetros de um route normal:
function logRequests(request, response, next) {
	const { method, url  } = request;
	const logLabel = `[${method.toUpperCase()}] - ${url}`;

	console.log(logLabel);

	// é necessário retornar essa função para a aplicação continue seu fluxo:
	return next(); 
}

app.use(logRequests); // identifica que o middleware será chamada em todas as rotas
```

---

É possível aplicar o middleware que várias formas diferentes:

→ Em todas as rotas diponíveis da aplicação:

```jsx
app.use(middleware);
```

→ Especifico para cada rota:

```jsx
/* 
*	Não existe um número limite de middlewares que podem ser aplicados
*	a uma rota.
*/
app.get("/route", middleware, (request, response) => {	
})
```

→ Para uma série de rotas:

```jsx
app.use('/route/:param', validaProjectId);
```

---

Também é possível realizar a execução de um trecho de código depois do ***next*** em ***middleware***

```jsx
// middleware que mede o tempo de cada requisição
function middleware(request, response, next) {
	const { method, url  } = request;
	const logLabel = `[${method.toUpperCase()}] - ${url}`;

	console.time(logLabel); // será executado 

	next();  // passará execução para a rota requerida
 
	console.time(logLabel); // após o retorno da rota requerida, será executado
}
```

Os Middlewares são aplamente  utiliazados para a validação de parâmetros em requisições

```jsx
// middleware que valida o uuid:
function validate(request, response, next) {
	const { id } request.params;

	if (!isUuid(id)) {
		return response.status(400).json({ message : 'Id do projeto não é válido'});
	}

	return next();
}

app.use('/projects/:id', validate);
```