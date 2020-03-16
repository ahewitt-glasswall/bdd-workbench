import re
from bdd_reader import BDD, BDDParser

class Node:
    def __init__(self, node_id, node_label, shape):
        self.id = node_id
        self.label = node_label
        self.shape = shape
        self.children = []
        

class BDDTreeCreator:
    def __init__(self):
        self.nodes = None
        self.relationships = []

    def create_tree(self, json_bdd):
        root_key = BDDTreeCreator().get_root_key(json_bdd)
        self.nodes = BDDTreeCreator().create_all_nodes(json_bdd)
        self.develop_children(json_bdd)
        self.populate_relationships()

    def populate_relationships(self):
        for node in self.nodes:
            for child_id in node.children:
                #   (Parent , Child)
                relationship = {'from' : node.id, 'to' : child_id}
                self.relationships.append(relationship)

    def develop_children(self, json_bdd):
        #This Part Adds Child Terminal Structs as Children e.g. BFileHeader:bp would add BFileHeader as child
        for node in self.nodes:
            struct = node.label.split(":")[0]
            for x in self.nodes:
                if x.label == struct and node.id != x.id:
                    node.children.append(x.id)
        #Add childs where struct contains it's variables (decl)
        for key in json_bdd:
            target_id = json_bdd[key]['id']
            for node in self.nodes:
                if node.id == target_id:
                    #start populating
                    ids = [decl['id'] for decl in json_bdd[key]['decls']]
                    node.children = ids 

    @staticmethod
    def create_all_nodes(json_bdd):
        nodes = []
        #Add Structs to Nodes
        for key in json_bdd:
            struct = json_bdd[key]
            for decl in struct['decls']:
                node = Node(decl['id'], decl['label'], "dot")
                nodes.append(node)
            node = Node(struct['id'], struct['label'], "dot")
            nodes.append(node)
        return nodes

    @staticmethod
    def get_root_key(json_bdd):
        for key in json_bdd:
            item = json_bdd[key]
            if 'root' in item:
                return key

def lambda_handler(event, context):
    bdd = BDD()
    bdd.read_from_string(event)
    bdd_parser = BDDParser()
    bdd_parser.parse( bdd.get_stream() )
    if bdd_parser.is_parse_successful == True:
        # Make Tree
        tree_creator = BDDTreeCreator()
        tree_creator.create_tree(bdd_parser.json_bdd)
        return {
            'statusCode' : 200,
            'body' : {
                'nodes' : [ {'id': node.id, 'label': node.label, 'shape' : 'dot'} for node in tree_creator.nodes],
                'edges' : tree_creator.relationships
            }
        }
    else:
        return {
            'statusCode' : 200,
            'body' : "Failure"
        }

event = open(r'C:\Users\TomasPilvelis\Documents\GitHub\GW-BDDWorkbench\bdd\bdd_example.bdd').read()
lambda_handler(event, "")