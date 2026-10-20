# raraapp

App de igreja em **Flutter, só para celular** (Android e iOS). O backend é o repositório irmão `../rara-backend` (Node + Fastify + MongoDB, organizado **por camada**: `src/models/`, `dtos/`, `services/`, `controllers/`, `routes/`).

Padrão geral de app Flutter: skill `flutter-app`. Como testar: skill `testar-sistema`. Deploy do backend: skill `deploy-servidor`.

## Regras do projeto
- **Só mobile:** formulário em uma coluna, listas em vez de grades, sem menu lateral fixo nem layout de tela larga. Ele roda no Chrome só por ser mais rápido.
- **Nada de MVC** (sem DTO/service/controller no app). Três camadas:
  - `lib/api/<entidade>_api.dart`: classe da entidade (`fromJson`/`toJson`, espelhando o model do `rara-backend`) + classe estática `<Entidade>Api`, uma função por rota. Todo HTTP passa pelo `ApiClient` (`lib/api/api_client.dart`), que injeta o token e devolve o `data` do envelope `{ success, data, message }`.
  - `lib/hooks/use_<entidades>.dart`: `ChangeNotifier` que estende `Hook` (ou `CrudHook<T>`) + acessor `use<Entidades>(context, {listen})`. **Registrar todo hook novo em `hooks/providers.dart`.**
  - `lib/components/<funcionalidade>/`: páginas, diálogos e cards. Peças reutilizáveis em `components/shared/` (efeitos em `shared/effects/`, tema em `components/theme/`).
- O que deixar de ser usado é apagado.
- Textos em português; senha sempre com o botão de olho (`CustomTextField(obscureText: true)`).

## Funcionalidades (pastas em `lib/components/`)
`auth` (login, cadastro, Google, completar cadastro), `app` (home, sidebar, aparência), `user` (Minha conta, poderes, equipe, integração, painéis), `church`, `christian_group`, `cura`, `dizimo_oferta` (contribuições, tesouraria, configurações de pagamento), `gift_test` (teste de dons), `lesson` (trilha do Avançai, professor, admin), `midia_local`.

Papéis usados: `super_admin`, `pastor`, `secretaria_igreja`, `secretaria_cura`, `tesouraria`, `tesouraria_equipe`, `leader`, `coleader`. Quase tudo é filtrado pela igreja da pessoa; o super admin escolhe a igreja.

## Rodar
- URL do backend: `--dart-define=API_URL=...` (padrão: produção `https://rara.cestsegtrabalho.com.br/api`).
- Local: `flutter run -d chrome --dart-define=API_URL=http://localhost:8080/api` (backend local na 8080; para teste, outra porta).
- Ele autorizou rodar o `rara-backend` e o app quando ajudar. **O `.env` do backend aponta para o banco de produção:** prefira leitura, apague o que o teste criar e pergunte antes de alterar dado existente.
- Checagem rápida: `flutter analyze`.
- APK: GitHub Actions `.github/workflows/build-apk.yml` (assina com a chave cadastrada no Google Cloud).

## Backend (rara-backend)
- EC2 `ubuntu@34.232.16.147`, chave `~/Documents/chaves .pem/rara-backend/rara-backend.pem`, Nginx + certbot (não migrar para Caddy), serviço systemd `rara-backend`.
- Deploy: ele faz commit e push; no servidor roda `./atualizar.sh`. O `.env` do servidor não está no git.
