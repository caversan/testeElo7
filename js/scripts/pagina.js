try {
    // Determinando o conteúdo que será carregado na página, dividi a página em módulos para poder
    // reaproveitar elelmentos em outras páginas ou facilitar a criação de template em algum framework
    // o conteudo ele tem um jsom e um tipo (exemplo galeria 3 colunas)
    // contentLoader(folder, json, type)
    contentLoader('js/data/templates/', 'header', 'header');
    contentLoader('js/data/templates/', 'video', 'video');
    contentLoader('js/data/templates/', 'time', 'gallery');
    contentLoader('js/data/templates/', 'sobrenos', 'txtgallery');
    contentLoader('js/data/templates/', 'vagas', 'vagas');



    // Carregamento dos Json
    function contentLoader(folder, json, type) {
        // Carregamento do json
        var loadedJson = new XMLHttpRequest();
        loadedJson.open('GET', (folder + json + '.json?t=' + Math.floor(Math.random() * 1000000)), true);
        // Teste de integridade
        loadedJson.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    loadContent(JSON.parse(this.responseText), type);
                } else {
                    // Error :(
                }
            }
        };
        loadedJson.send();
        // Fim do Carregamento do json
    }

    // aqui eu carrego o template e determino quais regras serão seguidas para 
    // determinado conteúdo onde eu ja passo o json pelo argumento data
    function loadContent(data, type) {
        switch (type) {
            case 'header':
                contentHeader(data);
                break;
            case 'video':
                contentVideo(data);
                break;
            case 'gallery':
                contentGallery(data);
                break;
            case 'txtgallery':
                contentTxtGallery(data);
                break;
            case 'vagas':
                contentVagas(data);
                break;
            case 'api':
                console.log('conteúdo vem de uma api')
                break;
            default:
                console.log('Nenhum tipo de template associado')
                break;
        }
    }


    // As funções contentNnnnn() abaixo populam o html de forma dinâmica

    function contentHeader(data) {
        document.getElementsByClassName('header')[0].getElementsByClassName('banner')[0].innerHTML += '<img width="100%" src="img/' + data.header.imagem + '"\/>';
        document.getElementsByClassName('header')[0].getElementsByClassName('banner')[0].getElementsByClassName('pagetitle')[0].innerHTML += data.header.titulo;
        document.getElementsByClassName('header')[0].getElementsByClassName('description')[0].innerHTML += data.header.descricao;
        document.getElementsByClassName('header')[0].getElementsByClassName('more')[0].innerHTML += '<a href="' + data.header.mais.link + '">' + data.header.mais.linkname + ' &#0187</a>';
    }

    function contentVideo(data) {
        document.getElementsByClassName('videocontainer')[0].getElementsByClassName("videoplayer")[0].innerHTML = '<img src="img/' + data.video.src + '"\/>';
        document.getElementsByClassName('videocontainer')[0].getElementsByClassName("videodescription")[0].getElementsByClassName("title")[0].innerHTML += data.video.titulo;
        document.getElementsByClassName('videocontainer')[0].getElementsByClassName("videodescription")[0].getElementsByClassName("subtitle")[0].innerHTML += data.video.subtitulo;
        document.getElementsByClassName('videocontainer')[0].getElementsByClassName("videodescription")[0].getElementsByClassName("description")[0].innerHTML += data.video.descricao;
    }

    function contentGallery(data) {
        document.getElementsByClassName('team')[0].getElementsByClassName('title')[0].innerHTML = data.galeria.titulo;
        for (i in data.galeria.imagens) {
            var teampic = document.createElement('div');
            teampic.className = 'teampic fourcol';
            document.getElementsByClassName('team')[0].getElementsByClassName('gallery')[0].appendChild(teampic);
            document.getElementsByClassName('team')[0].getElementsByClassName('gallery')[0].getElementsByClassName('teampic')[i].innerHTML += '<img src="img/' + data.galeria.imagens[i].src + '"\/>';
        }
    }

    function contentTxtGallery(data) {
        for (i in data.galeriatexto) {

            var imagecontainer = document.createElement('div');
            imagecontainer.className = 'imagecontainer threecol';
            document.getElementsByClassName('aboutus')[0].getElementsByClassName('txtgallery')[0].appendChild(imagecontainer);

            var picture = document.createElement('div');
            picture.className = 'picture';
            document.getElementsByClassName('aboutus')[0].getElementsByClassName('txtgallery')[0].getElementsByClassName('imagecontainer')[i].appendChild(picture);
            document.getElementsByClassName('aboutus')[0].getElementsByClassName('txtgallery')[0].getElementsByClassName('imagecontainer')[i].getElementsByClassName('picture')[0].innerHTML += '<img src="img/' + data.galeriatexto[i].ico + '"\/>';

            var title = document.createElement('div');
            title.className = 'title';
            document.getElementsByClassName('aboutus')[0].getElementsByClassName('txtgallery')[0].getElementsByClassName('imagecontainer')[i].appendChild(title);
            document.getElementsByClassName('aboutus')[0].getElementsByClassName('txtgallery')[0].getElementsByClassName('imagecontainer')[i].getElementsByClassName('title')[0].innerHTML += data.galeriatexto[i].titulo;

            var description = document.createElement('div');
            description.className = 'description';
            document.getElementsByClassName('aboutus')[0].getElementsByClassName('txtgallery')[0].getElementsByClassName('imagecontainer')[i].appendChild(description);
            document.getElementsByClassName('aboutus')[0].getElementsByClassName('txtgallery')[0].getElementsByClassName('imagecontainer')[i].getElementsByClassName('description')[0].innerHTML += data.galeriatexto[i].descricao;

        }
        document.getElementsByClassName('aboutus')[0].getElementsByClassName('more')[0].innerHTML += '<a href="' + data.mais.link + '">' + data.mais.linkname + ' &#0187</a>';
    }

    // Esta função é a que carrega a API de vagas
    function contentVagas(data) {

        document.getElementsByClassName('api_vagas')[0].getElementsByClassName('subbanner')[0].innerHTML += '<img src="img/' + data.lista.imagem + '"\/>';
        document.getElementsByClassName('api_vagas')[0].getElementsByClassName('title')[0].innerHTML += data.lista.titulo;

        // Aqui eu não utilizo o contentLoader pois a API segue regras específicas de carregamento de Json
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
            for (i in data.grupos) {

                var grouplist = document.createElement('div');
                grouplist.className = 'grouplist';
                document.getElementsByClassName('api_vagas')[0].appendChild(grouplist);

                var title = document.createElement('div');
                title.className = 'title';
                document.getElementsByClassName('api_vagas')[0].getElementsByClassName('grouplist')[i].appendChild(title);
                document.getElementsByClassName('api_vagas')[0].getElementsByClassName('grouplist')[i].getElementsByClassName('title')[0].innerHTML += data.grupos[i].nome;

                var list = document.createElement('div');
                list.className = 'list';
                document.getElementsByClassName('api_vagas')[0].getElementsByClassName('grouplist')[i].appendChild(list);

                var itemCounter = 0;
                for (j in data.grupos[i].vagas) {


                    //aqui começam os testes para que a vaga seja publicada no site. São testados:
                    // - Se está ativa,
                    // - Se os dados da localização existem ou estão completos
                    if (data.grupos[i].vagas[j].ativa) {
                        var listitem = document.createElement('div');
                        listitem.className = 'listitem';
                        document.getElementsByClassName('api_vagas')[0].getElementsByClassName('grouplist')[i].getElementsByClassName('list')[0].appendChild(listitem);

                        var position = document.createElement('div');
                        position.className = 'position';
                        document.getElementsByClassName('api_vagas')[0].getElementsByClassName('grouplist')[i].getElementsByClassName('list')[0].getElementsByClassName('listitem')[itemCounter].appendChild(position);
                        document.getElementsByClassName('api_vagas')[0].getElementsByClassName('grouplist')[i].getElementsByClassName('list')[0].getElementsByClassName('listitem')[itemCounter].getElementsByClassName('position')[0].innerHTML += '<a href="' + data.grupos[i].vagas[j].link + '">' + data.grupos[i].vagas[j].cargo + '</a>';

                        var location = document.createElement('div');
                        location.className = 'location';
                        document.getElementsByClassName('api_vagas')[0].getElementsByClassName('grouplist')[i].getElementsByClassName('list')[0].getElementsByClassName('listitem')[itemCounter].appendChild(location);
                        document.getElementsByClassName('api_vagas')[0].getElementsByClassName('grouplist')[i].getElementsByClassName('list')[0].getElementsByClassName('listitem')[itemCounter].getElementsByClassName('location')[0].innerHTML += ((data.grupos[i].vagas[j].localizacao) ? (data.grupos[i].vagas[j].localizacao.bairro ? (data.grupos[i].vagas[j].localizacao.bairro + (data.grupos[i].vagas[j].localizacao.cidade || data.grupos[i].vagas[j].localizacao.pais ? ' - ' : '')) : '') + (data.grupos[i].vagas[j].localizacao.cidade ? (data.grupos[i].vagas[j].localizacao.cidade + (data.grupos[i].vagas[j].localizacao.pais ? ', ' : '')) : '') + (data.grupos[i].vagas[j].localizacao.pais ? (data.grupos[i].vagas[j].localizacao.pais) : '') : 'REMOTO');

                        itemCounter++;
                    }
                }
            }
        }
    }

} catch (err) {
    alert(err)
}