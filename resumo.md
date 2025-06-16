
# 🔐 Autenticando com JWT (JSON Web Token)

## 📌 O que é JWT?
JWT (JSON Web Token) é um padrão aberto (RFC 7519) usado para transmitir informações seguras entre duas partes como um **objeto JSON**. É amplamente utilizado para **autenticação** em APIs modernas.

---

## 🚀 Rota de Autenticação

**Endpoint:**  
```
POST http://api.com/sessions
```

**Exemplo de corpo da requisição:**  
```json
{
  "email": "admin@admin.com",
  "password": "123123"
}
```

Se as credenciais forem válidas, o servidor responde com um **Token JWT**.

---

## 🧬 Estrutura do Token JWT

O token retornado é composto por **três partes** separadas por pontos (`.`):

```
<Header>.<Payload>.<Signature>
```

Exemplo:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwi...bGLgVSKmMCxzA6MQvAi1TgSN9G8
```

### 1️⃣ Header (Cabeçalho)
- Define o tipo de token (`JWT`) e o algoritmo de assinatura, como HMAC SHA256 ou RSA.
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### 2️⃣ Payload (Carga útil)
- Contém os **dados do usuário (claims)**, como ID, nome, permissões, etc.
- Exemplo:
```json
{
  "id": 2,
  "email": "admin@admin.com"
}
```

> ⚠️ O conteúdo do payload **não é criptografado**. Apenas codificado em Base64.

### 3️⃣ Signature (Assinatura)
- Garante que o token não foi alterado.
- É gerada com base no header e payload usando uma **chave secreta**.

```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

---

## ✅ Vantagens do JWT
- Stateless (sem necessidade de sessão no servidor)
- Seguro (quando bem implementado)
- Fácil de usar e transferir entre serviços

## ⚠️ Cuidados de Segurança
- Nunca armazene informações sensíveis no payload (como senhas).
- Use HTTPS para proteger a comunicação.
- Utilize uma chave secreta forte.
- Configure expiração (`exp`) no payload.

---

## 📌 Utilização do Token

Após autenticar, o token deve ser enviado nas próximas requisições como **Bearer Token**:

```
Authorization: Bearer <token_aqui>
```

---

🧠 **Resumo Final**:
JWT é uma forma moderna, leve e segura de autenticar usuários em APIs. É essencial entender suas partes e cuidados para garantir a segurança da aplicação.
