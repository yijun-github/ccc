
import json


""" separator used for pretty printing """
SEPARATOR = "=" * 5


def preprocess_data(data: str):
    """
    :param data: raw string data
    :return: data with end ',' truncated otherwise return None
    """
    if data.startswith('{'):
        if data.endswith('},\n'):
            return data[:-2]
        elif data.endswith('}\n'):
            return data[:-1]
    # print("invalid line:", data, end="")
    return None


 


def read_data_line_by_line(file_path: str):
    """
    lazy line by line reader
    :param file_path: twitter data file path
    """
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            yield line


 


def read_n_lines(twitter_data_path: str):
    """
    :param twitter_data_path: twitter data file path
    :return: read number of lines of data
    """
    with open(twitter_data_path, 'r', encoding='utf-8') as file:
        first_line = file.readline()
        assert first_line.endswith(",\"rows\":[\n")
        first_line = first_line[:-10] + "}"
        json_first_line = json.loads(first_line)
        return json_first_line["total_rows"] - json_first_line["offset"]



def dump_num_processor(comm_size):
    """
    :param comm_size: number of processor
    """
    print(SEPARATOR*2, "runs with {} processors".format(comm_size), SEPARATOR*2)
    print()
