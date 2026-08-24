NOSETESTS_FLAGS =

all: extensive show pylint
extensive: tests pep8
ci: NOSETESTS_FLAGS += --with-xunit
ci: deps all

tests:
	nosetests $(NOSETESTS_FLAGS) tests

pep8:
	pep8 src tests

pylint:
	pylint --rcfile pylintrc src

TEMPLATE_DIR=odde_training_template
COURSE_NAME=terrytalks
NOTEBOOK_DIR=slides
OUTPUT_DIR=build
include $(TEMPLATE_DIR)/template.mk

