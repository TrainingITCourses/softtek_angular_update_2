# Softtek Angular Update (Grupo DOS)

> [Laboratorio de ejemplo](https://github.com/TrainingITCourses/softtek_angular_update_2) del curso de [Angular Moderno Update Grupo 2 para Softtek](https://cursos.trainingit.es/course/view.php?id=1499) impartido por [Alberto Basalo](https://albertobasalo.dev) con TrainingIT.

> [!NOTE]
> This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version _17.3.3._
> Updated to Angular **17.3.3.**

## 1. Requisitos para el laboratorio

Comprobar [versión de Node.js](https://angular.io/guide/versions) y npm.

Instalar **Angular CLI**para generar aplicación de ejemplo.

```bash
# Check Node.js and npm versions
node -v
npm -v
# Install Angular CLI
npm i -g @angular/cli@latest
```

> [!NOTE]
> La aplicación de ejemplo estará en la carpeta [ActivityBookings](./ActivityBookings)

## 2. Generar aplicación de ejemplo

```bash
# Clone lab from github
git clone https://github.com/TrainingITCourses/softtek_angular_update_2.git
# Install and run
cd softtek_angular_update_2/ActivityBookings
# Generate new Angular project
ng new ActivityBookings --inline-style --inline-template --prefix=lab --ssr --style=css
# Or run with npx and options with aliases (- instead of --)
npx ng new ActivityBookings -s -t -p=lab --ssr --style=css
```

### Replicar a partir del laboratorio ya en marcha

El código fuente de la aplicación de ejemplo se encuentra en el repositorio de GitHub [softtek_angular_update_2](https://github.com/TrainingITCourses/softtek_angular_update_2).

```bash
# Clone lab from github
git clone https://github.com/TrainingITCourses/softtek_angular_update_2.git
# Install and run
cd softtek_angular_update_2/ActivityBookings
npm install
# Start Angular server
npm start
# Run a fake API server
npm run api:seed
```

---

<footer>
  <h3>🧑🏼‍💻 By <a href="https://albertobasalo.dev" target="blank">Alberto Basalo</a> </h3>
  <p>
    <a href="https://twitter.com/albertobasalo" target="blank">
      <img src="https://img.shields.io/twitter/follow/albertobasalo?logo=twitter&style=for-the-badge" alt="twitter albertobasalo" />
    </a>
  </p>
  <p>
    <a href="https://github.com/albertobasalo" target="blank">
      <img 
        src="https://img.shields.io/github/followers/albertobasalo?logo=github&label=profile albertobasalo&style=for-the-badge" alt="git albertobasalo" />
    </a>
  </p>
</footer>
