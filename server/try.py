import os
import subprocess

init_path = os.getcwd()
print(init_path)

command = ['ls', '-l']
subprocess.run(command, check=True)

final_path = os.getcwd()
print(final_path)
