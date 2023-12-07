<img src="asset/logo.png" height="120px" align="right">

# <ins>S</ins>ee and <ins>T</ins>hink: <ins>E</ins>mbodied Agent in <ins>V</ins>irtual <ins>E</ins>nvironment

<h3 align="center"> If you like our project, please give us a star ⭐ on GitHub for the latest update.</h3>

## ✏️ Installation
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

You can run task decomposition. Notice: Occasionally, the task decomposition may not be logical. If you notice the printed sub-goals are flawed, you can rerun the decomposition.
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
