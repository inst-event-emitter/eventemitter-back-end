Nodejs
=========

This is an Ansible role for Nodejs installation on RedHat family OS

Requirements
------------

This role has been tested with Ansible 2.5 only. It's also supposed that
you are using the merge behaviour for variables (please, see about
[hash_behaviour=merge](http://docs.ansible.com/ansible/latest/reference_appendices/config.html?highlight=hash%20behaviour#envvar-ANSIBLE_HASH_BEHAVIOUR)
for details)


Role Variables
--------------

This role declares and uses the configurations variables in a hash under the
_nodejs_ key (besides a variable nodejs_version). This is a description
for main variables:

  * _nodejs_version_ required Nodejs version
  * _nodejs.reinstall_ remove previously installed version of repository (major version changing)


Dependencies
------------

This role doesn't depend from other ansible roles

Example Playbook
----------------

An example of how to use this role:

    - hosts: servers
      roles:
        - role: nodejs
          nodejs_version: 9.11.1


License
-------

BSD
