# Cluster and Cloud Computing 2023 - Assignment 2 (Team 14)

This repository contains the source code for our 'COMP90024 Assignment 2 - Social Media Analytics on the Cloud' project.

**Web App URL:**  [http://45.113.234.176/](http://45.113.234.176/)

**YouTube Demos:**

Walkthrough of deployment:

Walkthrough of frontend/UI: [https://youtu.be/7oCPjouVqUs](https://youtu.be/ZwgfauaIFXg)

## System architecture

This project has been deployed on the [University of Melbourne Research Cloud (MRC)](https://dashboard.cloud.unimelb.edu.au/), using a range of technologies including [Apache CouchDB](https://couchdb.apache.org), [Ansible](https://www.ansible.com), [Docker](https://www.docker.com).

The report available [here] discusses the project in greater detail.

# Contributor

COMP90024 Project 2 2023

- Aobo Li (1172339)
- Pavith Samarakoon (1297058)
- Zhihao Liang (1367102)
- Jiqiang Chen (1171420)
- Yijun Liu (1132416)

## Repository structure

* `Data/` -- SUDO datasets, ASGS boundary geoJSONs, and jupyter notebook for processing the geospatial data
* `mastodon/` -- Mastodon toot harvester
* `twitter/` -- Script for processing Twitter data
* `back-end/` -- RESTful API
* `ccc-app/` -- Frontend web app
