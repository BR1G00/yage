# Yage

Editor visuale per la creazione di gamebook interattivi. Yage ti permette di creare, modificare e testare storie a scelta multipla attraverso un'interfaccia grafica intuitiva basata su grafi.

## 📋 Descrizione

Yage è un'applicazione desktop che consente di creare gamebook (libri game) in modo visuale. Puoi costruire la struttura della tua storia collegando pagine e scelte in un grafo interattivo, aggiungere contenuti, immagini e testare la narrazione in tempo reale attraverso la modalità Play.

## 🛠️ Stack Tecnologico

### Core Framework

- **Electron**
- **React 19**
- **TypeScript**
- **Vite**

### UI & Styling

- **Tailwind CSS** - Framework CSS
- **Radix UI** - Componenti UI accessibili e personalizzabili (Dialog, Select, Tooltip, etc.)
- **Lucide React** - Libreria di icone
- **Sonner** - Sistema di notifiche toast

### State Management & Data Flow

- **Zustand** - State management
- **React Flow** (@xyflow/react) - Libreria per visualizzazione e manipolazione di grafi interattivi

### Form & Validazione

- **React Hook Form** - Gestione form
- **Zod** - Validazione schema
- **@hookform/resolvers** - Integrazione tra React Hook Form e Zod

### Utilities

- **browser-image-compression** - Compressione immagini lato client
- **lodash** - Utility functions JavaScript
- **react-resizable-panels** - Pannelli ridimensionabili per layout flessibili
- **class-variance-authority** - Gestione varianti di componenti
- **clsx** & **tailwind-merge** - Utility per gestione classi CSS

## ✨ Funzionalità Principali

### Editor Visuale a Grafo

- Interfaccia drag-and-drop per creare e organizzare la struttura del gamebook
- Visualizzazione grafica delle connessioni tra pagine e scelte
- Mini-mappa per navigazione rapida in progetti complessi

### Modalità Play

- Test interattivo del gamebook in tempo reale
- Navigazione tra pagine seguendo le scelte
- Storia delle pagine visitate con possibilità di tornare indietro
- Restart rapido per ricominciare dall'inizio

### Gestione File

- Salvataggio e caricamento progetti in formato JSON
- Menu nativo Electron per operazioni file (New, Open, Save, Save As)
- Persistenza automatica dello stato in sessionStorage
- Indicatore del file corrente aperto

## 📁 Struttura del Progetto

```
yage/
├── src/
│   ├── components/          # Componenti React
│   │   ├── choice/         # Componenti per nodi Choice
│   │   ├── page/           # Componenti per nodi Page
│   │   ├── ui/             # Componenti UI riutilizzabili (Radix UI)
│   │   ├── Graph.tsx       # Componente principale del grafo
│   │   ├── NodeSidebar.tsx # Sidebar per editing nodi
│   │   ├── PlayStory.tsx   # Modalità Play
│   │   └── ToolBar.tsx     # Toolbar principale
│   ├── hooks/              # Custom React hooks
│   ├── lib/
│   │   └── stores/         # Store Zustand
│   │       └── gamebook.store.tsx
│   ├── models/             # Modelli TypeScript
│   │   ├── page.model.ts
│   │   └── choice.model.ts
│   ├── App.tsx             # Componente root
│   └── main.tsx            # Entry point React
├── main.js                 # Processo principale Electron
├── preload.js              # Preload script Electron
├── vite.config.ts          # Configurazione Vite
└── package.json            # Dipendenze e script
```

## 🎯 Come Iniziare

1. Installa le dipendenze:

```bash
npm install
```

2. Avvia l'applicazione in modalità sviluppo:

```bash
npm run electron:dev
```

3. Inizia a creare il tuo gamebook:
   - Clicca su "New Page" per aggiungere una pagina
   - Clicca su "New Choice" per aggiungere una scelta
   - Clicca su un nodo per modificarlo nella sidebar
   - Collega le pagine e le scelte tra loro
   - Usa "Play Story" per testare la tua storia
