Nginx
=========

This is an Ansible role for Nginx web server installation and configuration for Currenta project

Requirements
------------

This role has been tested with Ansible 2.5 only. It's also supposed that
you are using the merge behaviour for variables (please, see about
[hash_behaviour=merge](http://docs.ansible.com/ansible/latest/reference_appendices/config.html?highlight=hash%20behaviour#envvar-ANSIBLE_HASH_BEHAVIOUR)
for details)


Role Variables
--------------

This role declares and uses the configurations variables in a hash under the
_nginx_ key. This is a description for main variables:

  * _nginx.root_ section for nginx.conf configuration
  * _nginx.currenta_ section for configuration of Currenta server

Dependencies
------------

This role doesn't depend from other ansible roles

Example Playbook
----------------

An example of how to use this role:

    - hosts: servers
      roles:
        - role: nginx
          nginx:
            currenta:
              listen: 80

              location /:
                root: /var/www/currenta/public
                try_files: $uri $uri/ /index.html =404

              location = /favicon.ico:
                log_not_found: 'off'
                access_log: 'off'

              location /api:
                proxy_pass: http://127.0.0.1:3000/api

              error_log: /var/log/nginx/currenta_error.log
              access_log: /var/log/nginx/currenta_access.log


License
-------

BSD
