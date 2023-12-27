from STEVE import STEVE
# import socket
# import cv2
import numpy as np

# response = requests.post("http://127.0.0.1:8080/predict/?inputs=Write a Java script to craft a wooden pickaxe in Minecraft.")
# # print(response.json())
# print(response.text)
# print(response.status_code)

is_llama = False
# import transformer
# from transformers import LlamaForCausalLM, LlamaTokenizer
# You can also use mc_port instead of azure_login, but azure_login is highly recommended
azure_login = {
    "client_id": "866b6775-530a-4c5d-9095-edcea90527a4",
    "redirect_url": "https://127.0.0.1/auth-response",
    "secret_value": "HUc8Q~mE1uethY.4i-fLo3q0cvdgNBxPT-2A6bn_",
    "version": "fabric-loader-0.14.18-1.18",
}
os.environ["OPENAI_API_KEY"] = "openai_api_key"
os.environ["OPENAI_API_BASE"] = "openai_api_base"
mc_port = 49173
# First instantiate STEVE with skill_database_dir.
STEVE = STEVE(
    # azure_login=azure_login,
    base_url = "http://127.0.0.1:8080/predict/",
    is_llama = is_llama,
    mc_port=mc_port,
    openai_api_key=openai_api_key,
    openai_api_base=openai_api_base,
    openai_api_request_timeout=1200,
    skill_database_dir="./skill_database/skill", # Load a learned skill library.
    skill_manager_retrieval_top_k = 5,
    ckpt_dir="./skill_database/trial_1", # Feel free to use a new dir. Do not use the same dir as skill library because new events will still be recorded to ckpt_dir. 
    resume=False, # Do not resume from a skill library because this is not learning.
)


task = "Survive in the world." # e.g.
sub_goals = STEVE.decompose_task(task=task)
STEVE.inference(sub_goals=sub_goals, reset_env=False)
# STEVE.learn()
