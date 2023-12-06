import requests
import json
class LLM_api:
    def __init__(self, base_url: str = "http://127.0.0.1:8080/stream_chat/"):
        self.base_url = base_url
        self.content = ""
        self.headers = {"Content-type": "application/json"}

    def llm(self):
        def request(inputs):
        # request base_url with inputs
                response = requests.post(self.base_url, data=inputs, headers=self.headers)
                return response
        return request