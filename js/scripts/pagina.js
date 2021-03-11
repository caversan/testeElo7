try {
    // Determinando o conteúdo que será carregado na página
    //contentLoader(folder, json, type)
    contentLoader('js/data/templates/', 'header', 'header');
    contentLoader('js/data/templates/', 'video', 'video');
    contentLoader('js/data/templates/', 'time', 'gallery');
    contentLoader('js/data/templates/', 'sobrenos', 'txtgallery');
    contentLoader('js/data/templates/', 'vagas', 'vagas');



    // Carregamento dos Json
    function contentLoader(folder, json, type) {
        // Carregamento do json
        var loadedJson = new XMLHttpRequest();
        loadedJson.open('GET', (folder + json + '?t=' + Math.floor(Math.random() * 1000000)), true);
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

    function contentHeader(data) {
        document.getElementsByClassName('header')[0].getElementsByClassName('banner')[0].innerHTML += '<img src="img/' + data.header.imagem + '"\/>';
        document.getElementsByClassName('header')[0].getElementsByClassName('banner')[0].getElementsByClassName('pagetitle')[0].innerHTML += data.header.titulo;
        document.getElementsByClassName('header')[0].getElementsByClassName('description')[0].innerHTML += data.header.descricao;
        document.getElementsByClassName('header')[0].getElementsByClassName('more')[0].innerHTML += data.header.mais.link;
        document.getElementsByClassName('header')[0].getElementsByClassName('more')[0].innerHTML += data.header.mais.linkname;
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
            teampic.className = 'teampic';
            document.getElementsByClassName('team')[0].getElementsByClassName('gallery')[0].appendChild(teampic);
            document.getElementsByClassName('team')[0].getElementsByClassName('gallery')[0].getElementsByClassName('teampic')[i].innerHTML += '<img src="img/' + data.galeria.imagens[i].src + '"\/>';
        }
    }

    function contentTxtGallery(data) {
        for (i in data.galeriatexto) {

            var imagecontainer = document.createElement('div');
            imagecontainer.className = 'imagecontainer';
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
    }

    function contentVagas(data) {
        document.getElementsByClassName('api_vagas')[0].getElementsByClassName('subbanner')[0].innerHTML += '<img src="img/' + data.lista.imagem + '"\/>';
        document.getElementsByClassName('api_vagas')[0].getElementsByClassName('title')[0].innerHTML += data.lista.titulo;

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


                    if (data.grupos[i].vagas[j].ativa) {
                        var listitem = document.createElement('div');
                        listitem.className = 'listitem';
                        document.getElementsByClassName('api_vagas')[0].getElementsByClassName('grouplist')[i].getElementsByClassName('list')[0].appendChild(listitem);

                        var position = document.createElement('position');
                        position.className = 'position';
                        document.getElementsByClassName('api_vagas')[0].getElementsByClassName('grouplist')[i].getElementsByClassName('list')[0].getElementsByClassName('listitem')[itemCounter].appendChild(position);
                        document.getElementsByClassName('api_vagas')[0].getElementsByClassName('grouplist')[i].getElementsByClassName('list')[0].getElementsByClassName('listitem')[itemCounter].getElementsByClassName('position')[0].innerHTML += data.grupos[i].vagas[j].cargo;

                        var location = document.createElement('location');
                        location.className = 'location';
                        document.getElementsByClassName('api_vagas')[0].getElementsByClassName('grouplist')[i].getElementsByClassName('list')[0].getElementsByClassName('listitem')[itemCounter].appendChild(location);
                        document.getElementsByClassName('api_vagas')[0].getElementsByClassName('grouplist')[i].getElementsByClassName('list')[0].getElementsByClassName('listitem')[itemCounter].getElementsByClassName('location')[0].innerHTML += ((data.grupos[i].vagas[j].localizacao) ? (data.grupos[i].vagas[j].localizacao.bairro ? (data.grupos[i].vagas[j].localizacao.bairro + (data.grupos[i].vagas[j].localizacao.cidade || data.grupos[i].vagas[j].localizacao.pais ? ' - ' : '')) : '') + (data.grupos[i].vagas[j].localizacao.cidade ? (data.grupos[i].vagas[j].localizacao.cidade + (data.grupos[i].vagas[j].localizacao.pais ? ', ' : '')) : '') + (data.grupos[i].vagas[j].localizacao.pais ? (data.grupos[i].vagas[j].localizacao.pais) : '') : 'REMOTO');

                        itemCounter++;
                    }
                    //document.getElementsByClassName('api_vagas')[0].innerHTML += data.grupos[i].vagas[j].link;

                }
            }
        }
    }

} catch (err) {
    alert(err)
}