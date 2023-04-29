
import time
import json
from mpi4py import MPI
# mpiexec -np 4 python main.py -country ./language.json -data ./tinyTwitter.json
from io_util import read_data_line_by_line, preprocess_data, read_n_lines, dump_num_processor
import couchdb
from datetime import datetime
import traceback

 


def getConnection():

    # Connect to the CouchDB instance running on localhost with username and password
    username = 'admin'
    password = r'1dTY1!PWM2'
    ip = '45.113.234.176'
    url = 'http://{}:{}@{}:5984/'.format(username, password, ip)
    return couchdb.Server(url)


 


def create_dbs(db_names):
    couch = getConnection()
    for db_name in db_names:
        if db_name not in couch:
            couch.create(db_name)
            db = couch[db_name]
            design_doc_name = 'data'
            view_name = 'doc_exists'
            mapFunction = '''function (doc) {
                                emit(doc.id, null);
                                }'''


def get_db_name(obj:dict):
    year=2022
    month = obj['key'][1]
    return db_prefix + str(year) + '-' + str(month)


def update_bulk_db(couch, rst):
    for db_name in rst:
        db = couch[db_name]
        db.update(rst[db_name])


def main(db_names, twitter_data_path):

    program_start = time.time()
    # initialize communicator
    comm = MPI.COMM_WORLD
    comm_rank = comm.Get_rank()
    comm_size = comm.Get_size()

    if comm_rank == 0:
        dump_num_processor(comm_size)

    # calculating number of lines of data to be processed, line to start, line to end
    # read_n_lines(twitter_data_path)
    # 52533744
    n_lines = comm.bcast(52533744, root=0)
    lines_per_core = n_lines // comm_size
    # the total number of line to be read by the processor
    lines_to_end = n_lines + 1  # ignore first line
    # the index of the first line to be processed by the processor
    line_to_start = 1 + lines_per_core * comm_rank  # ignore first line
    # the index of the last line to be processed by the processor
    line_to_end = line_to_start + lines_per_core
    print(comm_rank, 'line:', line_to_start, line_to_end)
    if comm_rank == comm_size - 1:  # last core to finish all remaining lines
        line_to_end = lines_to_end

    # processing lines in specified range: line_to_start <= line_number <= line_to_end
    # ignore first line
    #
    rst = {}

    if comm_rank == 0:
        create_dbs(db_names)
    couch = getConnection()
    comm.barrier()
    db_name = db_names[0]
    for line_number, line in enumerate(read_data_line_by_line(twitter_data_path)):
        if line_number == line_to_end:
            break
        if line_number >= line_to_start:
            preprocessed_line = preprocess_data(line)
            if preprocessed_line:
                try:
                    json_obj = json.loads(preprocessed_line)
                    if db_name not in rst:
                        rst[db_name] = []
                    processed = process_data(json_obj)
                    rst[db_name].append(processed)

                except Exception as e:
                    # Print any other error message and the line that caused the error
                    print(f'Error processing line {line}: {e}')
                    traceback.print_exc()
                    # count of rst
                for t_db_name in rst:
                    if len(rst[t_db_name]) > 10000:
                        update_bulk_db(couch, rst)
                        rst = {}
                        break

    update_bulk_db(couch, rst)
    comm.barrier()


def process_data(json_obj):
    clean_data = {}
    clean_data = {
        '_id': '',
        'data':'',     
        'tokens': '',
        'tags': '',
       
    }
    if 'id' in json_obj:
        clean_data['_id'] = json_obj['id']
    if 'data' in json_obj:
        clean_data['data'] = json_obj['doc']['data']
    if 'value' in json_obj:
        clean_data['tokens'] = json_obj['value']['tokens']
        clean_data['tags'] = json_obj['value']['tags']

    return clean_data


if __name__ == "__main__":
    twitter_data_path = r'D:\twitter-huge.json'

    # twitter_data_path = r'/home/ubuntu/data/twitter/mnt/ext100/twitter-huge.json'
    # from 2022.1-2022.12
    db_prefix = 'huge-twitter-'
    db_names = ['huge-twitter']

    main(db_names, twitter_data_path)
# nohup mpiexec -np 2 python3 ~/import_db/single_table.py > output.log &
# mpiexec -np 2 python3 ~/import_db/single_table.py
# 86865
# Counter({(2022, 5): 9732685, (2022, 4): 9268307, (2022, 3): 9079971, (2022, 6): 8218697, (2022, 7): 7853569, (2022, 2): 5722661, (2022, 8): 2657851})
