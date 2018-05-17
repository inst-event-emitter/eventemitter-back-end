Currenta UI
=========

This is an Ansible role for Eventmitter frontend service deploy

Requirements
------------

This role has been tested with Ansible 2.5 only. It's also supposed that
you are using the merge behaviour for variables (please, see about
[hash_behaviour=merge](http://docs.ansible.com/ansible/latest/reference_appendices/config.html?highlight=hash%20behaviour#envvar-ANSIBLE_HASH_BEHAVIOUR)
for details)


Role Variables
--------------

This role declares and uses the configurations variables in a hash under the
_eventemitter_frontend_ key. This is a description for main variables:

  * _eventemitter_frontend.work_dir_ target dir where the frontend code should be delivered


Dependencies
------------

This role doesn't depend from other ansible roles

Example Playbook
----------------

An example of how to use this role:

    - hosts: servers
      roles:
        - role: eventemitter_backend


License
-------

BSD
