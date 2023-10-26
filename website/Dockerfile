# docker build -t vue:0.0.1 .
FROM node:20.2.0
WORKDIR /app
#COPY . /app
RUN npm install -g @vue/cli
RUN npm install -g @vitejs/plugin-vue
#RUN npm install -g vite
#RUN npm install --save-dev vite

#RUN ls /app
#RUN npm install
CMD ["npm", "run", "dev"]
