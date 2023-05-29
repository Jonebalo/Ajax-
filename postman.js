const valores = window.location.search;
    console.log(valores);
    const urlParams = new URLSearchParams(valores);
    let producto = urlParams.get('id');