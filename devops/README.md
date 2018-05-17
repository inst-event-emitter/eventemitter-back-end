# Eventemitter. CI/CD pipelines and deployment recipes.

This repository includes jenkins pipeline files, ansible playbooks and environmental
settings for deployment of the eventemitter project.
The collection of recipes implement a workflow to build and deliver changes on different
type of environments.

## Project structure

This is high level view for files and folders of this project:

       devops
        ├── ansible
        │   ├── environments
        │   │   └── dev
        │   │       ├── group_vars
        │   │       │   └── eventemitter
        │   │       └── inventory
        │   ├── eventemitter_backend.yml
        │   ├── eventemitter_frontend.yml
        │   ├── mongodb.yml
        │   ├── nginx.yml
        │   ├── nodejs.yml
        │   └── roles
        │       ├── eventemitter
        │       │   ├── backend
        │       │   └── frontend
        │       ├── mongodb
        │       ├── nginx
        │       └── nodejs
        └── pipelines
            └── eventemitter-Pipeline-DEV

* **ansible/environments** contains a directory for each supported environment where
  Ansible inventory files and specific variables are located, see details about inventories
  in [official documentation](http://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html);

* **ansible/playbook\*.yml** is a set of [ansible playbooks](http://docs.ansible.com/ansible/playbooks_intro.html)

* **ansible/roles** contains [ansible roles](http://docs.ansible.com/ansible/latest/user_guide/playbooks_reuse_roles.html)
  for eventemitter services (frontend, backend) as well as 3rd party dependencies (nginx, mongodb, nodejs)


## Deployment prerequisites

### Build server

Here the base requirements for build server:

  * [Jenkins 2.73+](https://jenkins.io/) with the following set of installed plugins:
    + [nodejs](https://plugins.jenkins.io/nodejs)

    ![Alt text](docs/images/jenkins_tools_nodejs.png?raw=true "Example")

    + [ansible](https://plugins.jenkins.io/ansible)

    ![Alt text](docs/images/jenkins_tools_ansible.png?raw=true "Example")

    + [ssh-agent](https://plugins.jenkins.io/ssh-agent)
    + [bitbucket](https://plugins.jenkins.io/bitbucket)
    + [ansicolor](https://plugins.jenkins.io/ansicolor)
    + [slack](https://plugins.jenkins.io/slack)
  * [Ansible 2.5](http://docs.ansible.com/ansible/latest/index.html)
  * generate an SSH key pair for deployment purposes, e.g:

        ssh-keygen -f ~/.ssh/eventemitter_deploy.pem

### Target nodes

On the nodes where you are going to install eventemitter services you need to have:

* python 2.7+
* allow sudo without password in */etc/sudoers*:

        %eventemitter_deploy        ALL=(ALL)       NOPASSWD: ALL

* copy public SSH key for user in *~eventemitter_deploy/.ssh/authourized_keys*

        install -m 700 -o eventemitter_deploy -d /home/eventemitter_deploy/.ssh
        echo "public-key" >> /home/eventemitter_deploy/.ssh/authorized_keys
        chmod 600 /home/eventemitter_deploy/.ssh/authorized_keys && chown eventemitter_deploy /home/eventemitter_deploy/.ssh/authorized_keys
