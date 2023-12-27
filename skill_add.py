from langchain.vectorstores import Chroma
from langchain.embeddings.openai import OpenAIEmbeddings
import os
import json
import STEVE.utils as U
ckpt_dir = './skill_database/trialn1'
add_dir_1 = './skill_database/trialn2'
add_dir_2 = './skill_database/trialn3'
final_dir = './skill_database/trial_add'

os.environ["OPENAI_API_KEY"] = "openai_api_key"
os.environ["OPENAI_API_BASE"] = "openai_api_base"
vectordb = Chroma(
            collection_name="skill_vectordb",
            embedding_function=OpenAIEmbeddings(),
            persist_directory=f"{ckpt_dir}/skill/vectordb",
        )

def add_new_skill(pth, old_pth):
    # read in skills from path
    old_skills = U.load_json(f"{old_pth}/skill/skills.json")
    code_path = os.path.join(pth, 'skill/code')
    description_path = os.path.join(pth, 'skill/description')
    # Search for all js files in the code directory
    for js_file in os.listdir(code_path):
        # Make sure it is a js file
        if js_file.endswith('.js'):
            program_name = js_file[:-3]  # Remove the .js suffix
            
            # Read Js file
            with open(os.path.join(code_path, js_file), 'r') as f:
                program_code = f.read().strip()
            
            # Read the description file
            description_file = os.path.join(description_path, program_name + '.txt')
            if os.path.exists(description_file):
                with open(description_file, 'r') as f:
                    description_content = f.read().strip()
                    skill_description = f"    // {description_content}"
            else:
                skill_description = "    // No description available"
            # Combine the code and description
            output_code = f'async function {program_name}(bot) {{\n'
            output_code += f'{skill_description}\n'
            output_code += '}'
            skill_description = output_code
            print(
                f"\033[33mSkill Manager generated description for {program_name}:\n{skill_description}\033[0m"
            )
            if program_name in old_skills:
                print(f"\033[33mSkill {program_name} already exists. Rewriting!\033[0m")
                # vectordb._collection.delete(ids=[program_name])
                # i = 2
                # while f"{program_name}V{i}.js" in os.listdir(f"{old_pth}/skill/code"):
                #     i += 1
                # dumped_program_name = f"{program_name}V{i}"
                continue
            else:
                dumped_program_name = program_name
            vectordb.add_texts(
                texts=[skill_description],
                ids=[program_name],
                metadatas=[{"name": program_name}],
            )
            old_skills[program_name] = {
                "code": program_code,
                "description": skill_description,
            }
            assert vectordb._collection.count() == len(
                old_skills
            ), "vectordb is not synced with skills.json"
            U.dump_text(
                program_code, f"{old_pth}/skill/code/{dumped_program_name}.js"
            )
            U.dump_text(
                skill_description,
                f"{old_pth}/skill/description/{dumped_program_name}.txt",
            )
            U.dump_json(old_skills, f"{old_pth}/skill/skills.json")
            vectordb.persist()
            
            
add_new_skill(add_dir_2, ckpt_dir)
