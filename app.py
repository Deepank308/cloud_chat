from src import app
from configurations import DevelopmentConfig

app.config.from_object(DevelopmentConfig())
