from flask import Flask, jsonify, request, send_file, session
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import codecs
import subprocess
import secret_pixel

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.secret_key = "super secret key"


UPLOAD_FOLDER = 'uploads/encrypt'
UPLOAD_FOLDER_DECRYPT = 'uploads/decrypt'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
if not os.path.exists(UPLOAD_FOLDER_DECRYPT):
    os.makedirs(UPLOAD_FOLDER_DECRYPT)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['final_path'] = '/home/anant2961/final_project/server/'
app.config['UPLOAD_FOLDER_DECRYPT'] = UPLOAD_FOLDER_DECRYPT


@app.route('/upload/encrypt', methods=['POST'])
def upload_file():
    # temp_dir = '/home/anant2961/final_project/server/'
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # session['temp_path'] = secure_filename(file.filename)
    if file:
        filename = secure_filename(file.filename)
        # ext = filename.split('.')[-1]
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        print(file_path)
        # session['temp_path'] = filename
        # app.config['final_path'] = 'home/anant2961/final_project/server/' + temp_path
        print("###")
        print("")
        print("")
        print("###")
        # print(final_path)
        return jsonify({'file_path': filename}), 200
    return jsonify({'error': 'Something went wrong'}), 500


@app.route('/upload/decrypt', methods=['POST'])
def upload_file_decrypt():
    # temp_dir = '/home/anant2961/final_project/server/'
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # session['temp_path'] = secure_filename(file.filename)
    if file:
        filename = secure_filename(file.filename)
        # ext = filename.split('.')[-1]
        file_path = os.path.join(app.config['UPLOAD_FOLDER_DECRYPT'], filename)
        file.save(file_path)
        print(file_path)
        # session['temp_path'] = filename
        # app.config['final_path'] = 'home/anant2961/final_project/server/' + temp_path
        print("###")
        print("")
        print("")
        print("###")
        # print(final_path)
        return jsonify({'file_path': filename}), 200
    return jsonify({'error': 'Something went wrong'}), 500


@app.route('/decrypt', methods=["POST"])
def decrypt():
    name = request.json['filename']
    input_image_path = '/home/anant2961/final_project/server/uploads/decrypt/'+name
    output_text_path = 'home/anant2961/final_project/client/crypt/public/extracted.txt'
    command = ['python3', 'secret_pixel.py', 'extract',
               input_image_path, 'myprivatekey.pem', output_text_path]
    try:
        subprocess.run(command, check=True)
    except subprocess.CalledProcessError as e:
        return jsonify({'error': f'Failed to decrypt data: {e}'}), 500
    return jsonify({'message': 'Data decrypted successfully'}), 200


@app.route('/encrypt', methods=["POST"])
def encrypt():
    # print(session.get('temp_path'))
    name = request.json['filename']
    input_image_path = '/home/anant2961/final_project/server/uploads/encrypt/'+name
    # print(final_path)
    output_image_path = '/home/anant2961/final_project/client/crypt/public/output_image.png'
    secret_text = 'secret.txt'
    print(input_image_path, "###")
    # return jsonify({'error': 'Failed to encrypt data'}), 500
    command = ['python3', 'secret_pixel.py', 'hide', input_image_path,
               secret_text, 'mypublickey.pem', output_image_path]
    try:
        subprocess.run(command, check=True)
        # return jsonify({'message': 'Data encrypted successfully'}), 200
    except subprocess.CalledProcessError as e:
        # return jsonify({'error': f'Failed to encrypt data: {e}'}), 500
        pass
    return jsonify({'message': 'Data encrypted successfully'}), 200


def download_image(image_path):
    if not os.path.exists(image_path):
        return jsonify({'error': 'Image not found'}), 404
    # filename = 'outputfinal_image.png'
    # return send_file(filename_or_fp="/home/anant2961/final_project/server/"+image_path, as_attachment=True)
    file_data = codecs.open(image_path, 'rb').read()
    response = make_response()
    response.headers['my-custom-header'] = 'my-custom-status-0'
    response.data = file_data
    return response


@app.route('/hello')
def hello_world():
    return jsonify({'message': 'Hello, World!'})


@app.route('/')
def help():
    return jsonify({'message': 'hii'})


if __name__ == '__main__':
    app.run(debug=True, port=8080)
