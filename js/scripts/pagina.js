try {
    // Determinando o conteúdo que será carregado na página
    contentLoader('js/data/templates/', 'header', 'header');
    contentLoader('js/data/templates/', 'video', 'video');
    contentLoader('js/data/templates/', 'time', 'gallery');
    contentLoader('js/data/templates/', 'sobrenos', 'txtgallery');
    contentLoader('js/data/templates/', 'vagas', 'vagas');



    // Carregamento dos Json
    function contentLoader(folder, content, type) {
        // Carregamento do json
        var loadedJson = new XMLHttpRequest();
        loadedJson.open('GET', (folder + content + '?t=' + Math.floor(Math.random() * 1000000)), true);
        // Teste de integridade
        loadedJson.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    loadContent(JSON.parse(this.responseText), content, type);
                } else {
                    // Error :(
                }
            }
        };
        loadedJson.send();
        // Fim do Carregamento do json
    }

    function loadContent(data, content, type) {
        switch (type) {
            case 'header':
                contentHeader(data, content);
                break;
            case 'video':
                contentVideo(data, content);
                break;
            case 'gallery':
                contentGallery(data, content);
                break;
            case 'txtgallery':
                contentTxtGallery(data, content);
                break;
            case 'vagas':
                contentVagas(data, content);
                break;
            case 'api':
                console.log('conteúdo vem de uma api')
                break;
            default:
                console.log('Nenhum tipo de template associado')
                break;
        }
    }

    function contentHeader(data, content) {
        document.getElementsByClassName('containerHeader')[0].getElementsByClassName('headerImage')[0].innerHTML = '<img src="img/' + data.header.imagem + '"\/>';
        document.getElementsByClassName('containerHeader')[0].getElementsByClassName('headerTitle')[0].innerHTML += data.header.titulo;
        document.getElementsByClassName('mainContainer')[0].getElementsByClassName('headerDescription')[0].innerHTML += data.header.descricao;
        document.getElementsByClassName('header')[0].innerHTML += data.header.mais.link;
        document.getElementsByClassName('header')[0].innerHTML += data.header.mais.linkname;
    }

    function contentVideo(data, content) {
        document.getElementsByClassName(content)[0].innerHTML = '<img src="img/' + data.video.src + '"\/>';
        document.getElementsByClassName(content)[0].innerHTML += data.video.titulo;
        document.getElementsByClassName(content)[0].innerHTML += data.video.subtitulo;
        document.getElementsByClassName(content)[0].innerHTML += data.video.descricao;
    }

    function contentGallery(data, content) {
        document.getElementsByClassName(content)[0].innerHTML = data.galeria.titulo;
        for (i in data.galeria.imagens) {
            document.getElementsByClassName(content)[0].innerHTML += '<img src="img/' + data.galeria.imagens[i].src + '"\/>';
        }
    }

    function contentTxtGallery(data, content) {
        for (i in data.galeriatexto) {
            document.getElementsByClassName(content)[0].innerHTML += '<img src="img/' + data.galeriatexto[i].ico + '"\/>';
            document.getElementsByClassName(content)[0].innerHTML += data.galeriatexto[i].titulo;
            document.getElementsByClassName(content)[0].innerHTML += data.galeriatexto[i].descricao;
        }
    }

    function contentVagas(data, content) {
        console.log(data)
        var apiVagas = new XMLHttpRequest();
        apiVagas.open('GET', (data.lista.listasrc + '?t=' + Math.floor(Math.random() * 1000000)), true);
        // Teste de integridade
        apiVagas.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    vagas(JSON.parse(this.responseText))
                } else {
                    // Error :(
                }
            }
        };
        apiVagas.send();

        function vagas(data) {
            console.log(data)
            for (i in data.grupos) {
                document.getElementsByClassName('api_vagas')[0].innerHTML += data.grupos[i].nome;
                for (j in data.grupos[i].vagas) {
                    document.getElementsByClassName('api_vagas')[0].innerHTML += data.grupos[i].vagas[j].cargo;
                    document.getElementsByClassName('api_vagas')[0].innerHTML += data.grupos[i].vagas[j].ativa;
                    document.getElementsByClassName('api_vagas')[0].innerHTML += data.grupos[i].vagas[j].link;
                    document.getElementsByClassName('api_vagas')[0].innerHTML += data.grupos[i].vagas[j].localizacao.bairro;
                    document.getElementsByClassName('api_vagas')[0].innerHTML += data.grupos[i].vagas[j].localizacao.cidade;
                    document.getElementsByClassName('api_vagas')[0].innerHTML += data.grupos[i].vagas[j].localizacao.pais;
                }
            }
        }

        document.getElementsByClassName(content)[0].innerHTML += '<img src="img/' + data.lista.imagem + '"\/>';
        document.getElementsByClassName(content)[0].innerHTML += data.lista.titulo;
        for (i in data.galeriatexto) {
            document.getElementsByClassName(content)[0].innerHTML += '<img src="img/' + data.galeriatexto[i].ico + '"\/>';
            document.getElementsByClassName(content)[0].innerHTML += data.galeriatexto[i].titulo;
            document.getElementsByClassName(content)[0].innerHTML += data.galeriatexto[i].descricao;
        }
    }

} catch (err) {
    alert(err)
}