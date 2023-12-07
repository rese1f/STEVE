<img src="asset/logo.png" height="120px" align="right">

# <ins>S</ins>ee and <ins>T</ins>hink: <ins>E</ins>mbodied Agent in <ins>V</ins>irtual <ins>E</ins>nvironment

[![](http://img.shields.io/badge/cs.CV-arXiv%3A2311.15209-B31B1B.svg)](https://arxiv.org/abs/2311.15209)

> **See and Think: Embodied Agent in Virtual Environment**  
> Zhonghan Zhao*, Wenhao Chai*, Xuan Wang*, Li Boyi, Shengyu Hao, Shidong Cao, Tian Ye, Jenq-Neng Hwang, Gaoang Wang✉️   
> _arXiv 2023_  

[![](https://img.youtube.com/vi/WGP99R5UXq0/0.jpg)](https://www.youtube.com/embed/WGP99R5UXq0?si=i2LVxm3Mlw1F5WTZ)

STEVE, named after the protagonist of the game Minecraft, is our proposed framework aims to build an embodied agent based on the vision model and LLMs within an open world.

## :fire: News
* **[2023.12.06]** : We release our code at [code-v0 branch](https://github.com/rese1f/STEVE/tree/code-v0).
* **[2023.11.26]** :page_with_curl: We release the [paper](https://arxiv.org/abs/2311.15209).

<h3 align="center"> If you like our project, please give us a star ⭐ on GitHub for the latest update.</h3>

## Installation
STEVE requires Python ≥ 3.9 and Node.js ≥ 16.13.0. We have tested on Ubuntu 20.04, Windows 11, and macOS. You need to follow the instructions below to install STEVE.

### Python Install
```
git clone https://rese1f.github.io/STEVE/
cd STEVE
pip install -e .
```

### Node.js Install
In addition to the Python dependencies, you need to install the following Node.js packages:
```
cd STEVE/env/mineflayer
npm install -g npx
npm install
cd mineflayer-collectblock
npx tsc
cd ..
npm install
```

### Fabric Mods Install

You need to install fabric mods to support all the features in STEVE. Remember to use the correct Fabric version of all the mods. 

Follow the instructions in [Fabric Mods Install](installation/fabric_mods_install.md) to install the mods.

## Getting Started
STEVE uses OpenAI's STEVE-7B/13B as the language model. You need to have STEVEenAI API key to use STEVE. You can get one from [here](https://platform.openai.com/account/api-keys).

After the installation process, you can run STEVE by:
```python
from STEVE import STEVE

# You can also use mc_port instead of azure_login, but azure_login is highly recommended
azure_login = {
    "client_id": "YOUR_CLIENT_ID",
    "redirect_url": "https://127.0.0.1/auth-response",
    "secret_value": "[OPTIONAL] YOUR_SECRET_VALUE",
    "version": "fabric-loader-0.14.18-1.19", # the version STEVE is tested on
}
openai_api_key = "YOUR_API_KEY"

STEVE = STEVE(
    azure_login=azure_login,
    openai_api_key=openai_api_key,
)

# start lifelong learning
STEVE.learn()
```
### Resume from a checkpoint during learning

If you stop the learning process and want to resume from a checkpoint later, you can instantiate STEVE by:
```python
from STEVE import STEVE

STEVE = STEVE(
    azure_login=azure_login,
    openai_api_key=openai_api_key,
    ckpt_dir="YOUR_CKPT_DIR",
    resume=True,
)
```

### Run STEVE for a specific task with a learned skill library

If you want to run STEVE for a specific task with a learned skill library, you should first pass the skill library directory to STEVE:
```python
from STEVE import STEVE

# First instantiate STEVE with skill_database_dir.
STEVE = STEVE(
    azure_login=azure_login,
    openai_api_key=openai_api_key,
    skill_database_dir="./skill_datbase/skill",  
    ckpt_dir="YOUR_CKPT_DIR", 
    resume=False,  
)
```
Then, you can run task decomposition. Notice: Occasionally, the task decomposition may not be logical. If you notice the printed sub-goals are flawed, you can rerun the decomposition.
```python
# Run task decomposition
task = "YOUR TASK" # e.g. "Craft a diamond pickaxe"
sub_goals = STEVE.decompose_task(task=task)
```
Finally, you can run the sub-goals with the learned skill library:
```python
STEVE.inference(sub_goals=sub_goals)
```
## ✏️ Citation

If you find STEVE useful for your your research and applications, please cite using this BibTeX:

```bibtex
@article{zhao2023see,
  title={See and Think: Embodied Agent in Virtual Environment},
  author={Zhao, Zhonghan and Chai, Wenhao and Wang, Xuan and Boyi, Li and Hao, Shengyu and Cao, Shidong and Ye, Tian and Hwang, Jenq-Neng and Wang, Gaoang},
  journal={arXiv preprint arXiv:2311.15209},
  year={2023}
}
```
