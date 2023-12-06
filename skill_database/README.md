# Learned Skill Libraries

## Ours

* [skill_database/skill](skill)

### How to resume from a community contribution
First, you need to clone or download their repo. Then, the resume is the same as using our skill libraries. Just set `skill_database_dir=COMMUNITY_CKPT_DIR` where `COMMUNITY_CKPT_DIR` is the ckpt dir inside the folder you just downloaded.

## How to Contribute

After you run the learning process, you will see a checkpoint directory like:
```
.
├── action
│   └── chest_memory.json
├── curriculum
│   ├── completed_tasks.json
│   ├── failed_tasks.json
│   ├── qa_cache.json
│   └── vectordb
├── events
└── skill
    ├── code
    │   ├── catchThreeFishWithCheck.js
    │   ├── collectBamboo.js
    │   ├── ...
    ├── description
    │   ├── catchThreeFishWithCheck.txt
    │   ├── collectBamboo.txt
    │   └── ...
    ├── skills.json
    └── vectordb
```

Only `YOUR_CKPT_DIR/skill` is a learned skill library, which you can share with others. Create a pull request and add your skill library link to this page.
