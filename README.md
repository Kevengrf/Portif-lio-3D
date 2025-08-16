# Portfólio Interativo 3D

Uma pequena viagem imersiva através do meu universo profissional.

![Demonstração do Portfólio](/img/example.png)

## O Conceito

Em vez de um currículo ou portfólio estático, decidi criar uma experiência. Este projeto é uma forma criativa e interativa de apresentar minhas habilidades, projetos e informações de contato. 

Cada esfera que orbita o modelo central representa uma área da minha carreira. Ao navegar neste pequeno "sistema solar" profissional, você pode explorar cada uma delas de forma independente, mergulhando nos detalhes que mais lhe interessam.

A ideia foi combinar minha paixão por desenvolvimento e design para criar algo único e memorável.

## Tecnologias Utilizadas

Este projeto foi construído do zero utilizando tecnologias web modernas:

- **HTML5**: Para a estrutura base e o conteúdo dos cards.
- **CSS3**: Para a estilização de toda a interface 2D, incluindo os cards e a responsividade.
- **JavaScript (ES6+)**: Para a lógica geral da aplicação.
- **Three.js**: A alma do projeto. Esta biblioteca foi usada para criar e renderizar toda a cena 3D, incluindo os modelos, as luzes, as estrelas e a interatividade.

## Como Executar Localmente

Por questões de segurança dos navegadores (CORS), os arquivos 3D e texturas não carregam ao abrir o `index.html` diretamente.

Para visualizar o projeto, é necessário um servidor local simples:

1.  Certifique-se de ter Python instalado (a maioria dos sistemas macOS e Linux já o possui).
2.  Abra um terminal na pasta raiz do projeto.
3.  Execute o comando:
    ```bash
    python3 -m http.server
    ```
4.  Abra seu navegador e acesse: `http://localhost:8000`

## Estrutura do Projeto

- `index.html`: Contém a estrutura da página e todo o conteúdo de texto dos cards. Para alterar as informações, edite este arquivo.
- `style.css`: Responsável por toda a aparência dos cards, títulos e pela adaptação para dispositivos móveis.
- `script.js`: Onde toda a mágica do Three.js acontece. Controla a cena 3D, as animações, as órbitas e a interatividade de clique.
- `img/`: Pasta com os recursos visuais, como o modelo 3D e as texturas.

---

*Desenvolvido com ☕ por Keven William.*
# Portif-lio-3D
