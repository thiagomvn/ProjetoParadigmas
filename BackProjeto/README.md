Nome do Projeto: Sistema de Gerenciamento de Biblioteca Online

Requisitos Funcionais:

1 - **Registro de Usuários:** Os usuários podem se registrar no sistema, fornecendo informações básicas como nome, endereço de e-mail e senha.
2 - **Gerenciamento de Livros:** Os usuários podem pesquisar livros por título, autor ou categoria. Eles também podem visualizar detalhes dos livros, como sinopse, autor, disponibilidade e número de cópias disponíveis.
3 - **Empréstimo de Livros:** Os usuários registrados podem solicitar empréstimos de livros disponíveis. O sistema deve rastrear os empréstimos ativos de cada usuário e a data de devolução prevista.
4 - **Lembrete de disponibilidade:** Os usuários podem adicionar um lembrete de livros que estão atualmente emprestados por outros usuários. Quando um livro  estiver disponível, o sistema notificará o usuário que fez o lembrete.
5 - **Avaliações e Comentários:** Os usuários podem avaliar e deixar comentários sobre os livros que leram. Outros usuários podem visualizar essas avaliações e comentários ao pesquisar os livros.
Requisitos Não Funcionais:

**Segurança:** O sistema deve garantir a segurança das informações dos usuários, incluindo senhas criptografadas e comunicação segura.
**Desempenho:** O sistema deve ser capaz de lidar com um grande número de usuários simultâneos e consultas de banco de dados de forma eficiente, garantindo tempos de resposta rápidos.
**Usabilidade:** A interface do usuário deve ser intuitiva e fácil de usar, tanto em dispositivos móveis quanto em desktops.
**Disponibilidade:** O sistema deve estar disponível 24 horas por dia, 7 dias por semana, com um tempo de inatividade mínimo planejado para manutenção.
**Escalabilidade:** O sistema deve ser dimensionado facilmente para lidar com um aumento no número de usuários e livros sem comprometer o desempenho.
**Compatibilidade:** O sistema deve ser compatível com diferentes navegadores da web e dispositivos para garantir uma experiência consistente para todos os usuários.

# Sistema de Gerenciamento de Biblioteca Online

## Regras de Negócio

| Entidade   | Regra de Negócio                                                                                          | Descrição                                                                                     |
|------------|----------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| Autores    | Um autor pode ter múltiplos livros.                                                                       | Relacionamento um-para-muitos entre autores e livros.                                        |
|            | O nome do autor é obrigatório.                                                                            | O campo nome não pode ser nulo ou vazio.                                                     |
| Livros     | Cada livro deve ter um autor associado.                                                                   | Relacionamento obrigatório entre livros e autores.                                           |
|            | Um livro pode ser emprestado a apenas um usuário por vez.                                                 | Regra de exclusividade de empréstimo.                                                        |
|            | O título do livro é obrigatório.                                                                          | O campo título não pode ser nulo ou vazio.                                                   |
|            | A quantidade de exemplares disponíveis deve ser maior ou igual a zero.                                    | Controle de estoque de livros.                                                               |
| Empréstimos| Um empréstimo deve registrar a data de empréstimo e a data de devolução prevista.                         | Controle de período de empréstimo.                                                           |
|            | Um usuário pode ter, no máximo, 3 livros emprestados simultaneamente.                                     | Limitação de quantidade de empréstimos por usuário.                                          |
|            | Um empréstimo é considerado ativo até que a data de devolução real seja registrada.                       | Diferenciação entre empréstimos ativos e concluídos.                                         |
| Comentários| Um usuário pode comentar sobre qualquer livro.                                                            | Permissão de interação do usuário com os livros.                                             |
|            | Cada comentário deve estar associado a um usuário e a um livro.                                           | Relacionamento obrigatório entre comentários, usuários e livros.                             |
|            | O texto do comentário é obrigatório.                                                                      | O campo texto não pode ser nulo ou vazio.                                                    |
| Usuários   | Um usuário deve se registrar com um nome único e senha.                                                   | Requisito de autenticação.                                                                   |
|            | Um usuário pode ver o histórico de seus empréstimos e comentários.                                        | Funcionalidade de perfil do usuário.                                                         |
|            | Um usuário pode atualizar suas informações pessoais (exceto nome de usuário).                             | Flexibilidade para manutenção de dados pessoais.                                             |
|            | O e-mail do usuário deve ser único e obrigatório.                                                         | Garantia de comunicação e identificação única.                                               |

### Notas adicionais:

1. **Autores**:
   - Podem ser adicionados, atualizados e removidos apenas por administradores.

2. **Livros**:
   - Podem ser adicionados, atualizados e removidos apenas por administradores.
   - A quantidade de exemplares disponíveis deve ser ajustada automaticamente com base nos empréstimos e devoluções.

3. **Empréstimos**:
   - Devem ter validação de disponibilidade de exemplares antes da criação.
   - Podem ser renovados caso não haja reservas para o livro em questão.

4. **Comentários**:
   - Podem ser moderados por administradores para evitar conteúdo inapropriado.

5. **Usuários**:
   - Devem poder recuperar a senha através do e-mail registrado.
   - Administradores podem gerenciar (adicionar, atualizar, remover) usuários.


### Como Usuário:

1. **Cadastro e Autenticação**
   - **Como**: Visitante
   - **Quero**: Me cadastrar no sistema com um nome de usuário único e senha.
   - **Para**: Que eu possa acessar os recursos da biblioteca.

2. **Empréstimo de Livros**
   - **Como**: Usuário autenticado
   - **Quero**: Buscar e solicitar o empréstimo de um livro disponível.
   - **Para**: Que eu possa ler o livro.

3. **Gerenciamento de Empréstimos**
   - **Como**: Usuário autenticado
   - **Quero**: Ver a lista dos meus livros emprestados e suas datas de devolução.
   - **Para**: Que eu possa gerenciar meus empréstimos e evitar atrasos.

4. **Comentários**
   - **Como**: Usuário autenticado
   - **Quero**: Comentar sobre um livro que li.
   - **Para**: Que eu possa compartilhar minha opinião com outros usuários.


### Como Administrador:

1. **Gerenciamento de Autores**
   - **Como**: Administrador
   - **Quero**: Adicionar, atualizar ou remover autores.
   - **Para**: Manter o catálogo de autores atualizado.

2. **Gerenciamento de Livros**
   - **Como**: Administrador
   - **Quero**: Adicionar, atualizar ou remover livros.
   - **Para**: Manter o catálogo de livros atualizado.

3. **Moderação de Comentários**
   - **Como**: Administrador
   - **Quero**: Moderar comentários dos usuários.
   - **Para**: Garantir que os comentários sejam apropriados.

4. **Gerenciamento de Usuários**
   - **Como**: Administrador
   - **Quero**: Adicionar, atualizar ou remover usuários.
   - **Para**: Gerenciar o acesso ao sistema.

5. **Controle de Empréstimos**
   - **Como**: Administrador
   - **Quero**: Ver e gerenciar todos os empréstimos.
   - **Para**: Garantir que os empréstimos estejam dentro das regras estabelecidas.


![image](https://github.com/JoseEpitacio/ProjetoAPS/assets/102174835/8d4ba275-1b50-4ce4-96e4-24a1ba07986f)
