# Feignjs-request
Plain Ajax-client for [FeignJs](https://github.com/feignjs/feignjs) (using xhr)


## Installation
```
bower install feignjs-xhr
```

## Getting started
this library can be used as client for feign:

```
feign.builder()
	.client(new FeignXhr())        
    .target(restDescription, 'http://jsonplaceholder.typicode.com');
```


## Options
The constructor accepts an options-object:

| Option | Note | default
|---|---|---|
| defaults | defaults to be used | { method: null, url: null, async: true, user: null,password: null}


