from lark import Lark, Transformer
import os

class TreeToJSON:
    def __init__(self, tree):
        self.tree = tree
        self.json_structs = {}

    def transform(self):
        struct_id = 1
        for item in self.tree.children:
            if item.data == 'struct':
                self.json_structs.update(self.struct(item, struct_id))
            if item.data == 'document':
                self.json_structs.update(self.document(item, struct_id))
            struct_id = struct_id + 1
    
    def declaration(self, declaration, id_num):
        x = {}
        for item in declaration.children:
            x[item.data] = item.children[0].value
        x['id'] = id_num
        x['label'] = x['datatype'] + ":" + x['variable']
        return x

    def struct(self, struct, id_num):
        name = struct.children[0].children[0].value
        structure = {
            name : {
                'id' : id_num,
                'label' : name,
                'decls' : []
            }
        }
        decl_id = (id_num << 8) + 1
        for item in struct.children:
            if item.data == 'declaration':
                structure[name]['decls'].append( self.declaration(item, decl_id) )
                decl_id = decl_id + 1
        return structure

    def document(self, document, id_num):
        name = document.children[0].children[0].value
        doc = {
            name : {
                'id' : id_num,
                'label' : name,
                'root' : True,
                'decls' : []
            }
        }
        decl_id = (id_num << 8) + 1
        for item in document.children:
            if item.data == 'declaration':
                doc[name]['decls'].append( self.declaration(item, decl_id) )
                decl_id = decl_id + 1
        return doc

class BDD:
    def __init__(self):
        self.__stream = None

    def read_from_file(self, bdd_file_path):
        #TODO:Check Exists
        f = open(bdd_file_path)
        self.__stream = f.read()

    def read_from_string(self, bdd_string):
        self.__stream = bdd_string

    def get_stream(self):
        return self.__stream


class BDDParser:
    def __init__(self):
        self.is_parse_successful = False
        self.tree = None
        try:
            grammer_file = open(os.path.join( os.getcwd(), "grammer.lark"))
        except FileNotFoundError:
            try:
                grammer_file = open(os.path.join( os.getcwd(), "backend", "visualisor", "grammer.lark"))
            except FileNotFoundError:
                print("File Not Found")
            
        self.lark = Lark(grammer_file.read(), parser='lalr')
        self.json_bdd = None

    def parse(self, bdd_stream):
        self.tree = self.lark.parse(bdd_stream)
        translator = TreeToJSON(self.tree)
        translator.transform()
        self.json_bdd = translator.json_structs
        #print(translator.json_structs)
        self.print_tree()
        self.is_parse_successful = True
        
    def print_tree(self):
        print(self.tree.pretty())