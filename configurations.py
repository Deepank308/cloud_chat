class BaseCongig(object):
	'''
	Base config class
	'''
	DEBUG = True
	TESTING = False
	DB_SERVER = '192.168.1.56'

	@property
	def DATABASE_URI(self):         # Note: all caps
		return 'mysql://user@{}/foo'.format(self.DB_SERVER)

class ProductionConfig(BaseCongig):
	"""
	Production specific config
	"""
	DEBUG = False

class DevelopmentConfig(BaseCongig):
	"""
	Development environment specific configuration
	"""
	DB_SERVER = 'localhost'
	DEBUG = True
	TESTING = True
