# FASES DO PROJETO: LOJA VIRTUAL

O projeto será executado em duas grandes fases, conforme solicitado.

---

## 🎨 FASE 1: FRONTEND & UI/UX

Nesta fase, focaremos na construção visual e na lógica de interface do usuário, utilizando dados estáticos para representação inicial.

### Objetivos:
- [x] **Configuração Inicial:** Next.js 14, TailwindCSS, TypeScript.
- [x] **Design System:** Definição de cores, tipografia e componentes base baseados na imagem de referência (Estilo Ekommart: limpo, vibrante, moderno).
- [x] **Componentes Core:**
    - Header (Busca, Carrinho, Login).
    - ProductCard (Preço, Badge de Desconto, Hover effects).
    - Hero Banners (Estilo carrossel/grid da imagem).
    - Footer.
- [x] **Páginas:**
    - **Home:** Listagem categorizada (ex: Trending This Week, Featured Items).
    - **Produto:** Detalhes ricos, seleção de variações (Tamanho/Cor).
    - **Carrinho:** Drawer ou página com resumo e cálculo de frete simulado.
    - **Checkout:** UI completa do formulário de entrega e resumo.
    - **Sucesso:** Tela de confirmação.

---

## 🖥️ FASE 1.5: ADMIN DASHBOARD (FRONTEND)

Construção da interface administrativa para gestão da loja.

### Objetivos:
- [ ] **Interface de Login:** Página de acesso restrito.
- [ ] **Dashboard Overview:** Visão geral com gráficos de vendas, pedidos recentes e métricas de desempenho.
- [ ] **Layout Administrativo:** Sidebar completa e top-bar com busca e notificações.

---
> [!NOTE]
> Ao final desta fase, apresentarei a UI completa rodando com dados mockados para sua aprovação.

---

## ⚙️ FASE 2: BACKEND, DB & INTEGRAÇÕES

Nesta fase, daremos vida à aplicação conectando-a ao Supabase e ao Mercado Pago.

### Objetivos:
- [ ] **Infraestrutura Supabase:**
    - Criação das tabelas com suporte a variações (Tabelas: `produtos`, `variacoes_produto`, `pedidos`, `itens_pedido`).
    - Configuração do **Supabase Auth** (Login/Senha).
    - Configuração do **Storage** para imagens.
- [ ] **API & Backend:**
    - Route Handlers para busca de produtos e filtragem.
    - Integração com o SDK do Mercado Pago.
    - Endpoint de Webhook para processamento automático de pagamentos.
- [ ] **Painel Administrativo:**
    - Dashboard simples para gerenciar estoque e status de pedidos.
    - Formulário de cadastro de produtos com upload de imagens.
- [ ] **Finalização:**
    - Deploy na Vercel.
    - Testes E2E de compra completa.

---

## 🚦 PRÓXIMOS PASSOS
1. Aprovação do Plano de Implementação (`loja-virtual-plan.md`).
2. Início do setup da FASE 1.
