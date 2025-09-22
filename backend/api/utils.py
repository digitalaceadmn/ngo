import threading

def run_in_background(func, *args, **kwargs):
    thread = threading.Thread(target=func, args=args, kwargs=kwargs)
    thread.start()
    print(f"Started background thread {thread.name} for {func.__name__}")