import pandas as pd

# 1. Load CSV
df = pd.read_csv("students.csv")

# 2. Explore
print(df.head())
print(df.info())
print(df.describe())

# # 3. Clean Missing
df["marks"].fillna(df["marks"].mean(), inplace=True)

# 4. Add new column
df["status"] = df["marks"].apply(lambda x: "Pass" if x >= 40 else "Fail")

# 5. Filter
top_students = df[df["marks"] > 80]

# 6. Group
city_stats = df.groupby("city")["marks"].mean()

# 7. Export
df.to_csv("clean_students.csv", index=False)
