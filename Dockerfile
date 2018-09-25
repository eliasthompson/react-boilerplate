FROM nginx

# Create app directory
WORKDIR /usr/share/nginx/html

# Bundle app source
RUN npm install
RUN npm run build
COPY build /usr/share/nginx/html

# Add URL Redirect
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# User override for ext4 hosts
ARG USER_OVERRIDE
RUN if [ ! -z ${USER_OVERRIDE+x} ]; then chown $USER_OVERRIDE:$USER_OVERRIDE /usr/share/nginx/html; fi

EXPOSE 80
